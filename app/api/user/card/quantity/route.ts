import { NextResponse } from 'next/server'

import { connectToDb } from '@/app/api/db'
import { ProductId } from '@/app/types/products'

type Action = 'increase' | 'decrease'

export async function PATCH(request: Request) {
  try {
    const { db } = await connectToDb()
    const { productId, action }: { productId: ProductId; action: Action } = await request.json()

    const pId = Number(productId)

    if (action === 'increase') {
      // $push is atomic — no race condition
      const result = await db.collection('user').findOneAndUpdate(
        { id: '1' },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      { $push: { products: pId } } as any,
        { returnDocument: 'after', projection: { products: 1 } }
      )
      return NextResponse.json(result?.products ?? [])
    }

    // Atomically remove exactly one occurrence of pId using an aggregation pipeline update.
    // $pull removes ALL occurrences, so we use $let + $indexOfArray to splice out a single element.
    const result = await db.collection('user').findOneAndUpdate(
      { id: '1', products: pId },
      [
        {
          $set: {
            products: {
              $let: {
                vars: { idx: { $indexOfArray: ['$products', pId] } },
                in: {
                  $concatArrays: [
                    { $slice: ['$products', '$$idx'] },
                    {
                      $slice: [
                        '$products',
                        { $add: ['$$idx', 1] },
                        { $size: '$products' }
                      ]
                    }
                  ]
                }
              }
            }
          }
        }
      ],
      { returnDocument: 'after', projection: { products: 1 } }
    )

    // No match means product wasn't in cart — return current state
    if (!result) {
      const user = await db
        .collection('user')
        .findOne({ id: '1' }, { projection: { products: 1 } })
      return NextResponse.json(user?.products ?? [])
    }

    return NextResponse.json(result.products ?? [])
  } catch {
    return NextResponse.json({ message: 'Помилка сервера' }, { status: 500 })
  }
}
