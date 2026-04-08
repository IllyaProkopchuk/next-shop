import { NextResponse } from 'next/server'

import type { Document } from 'mongodb'

import { connectToDb } from '@/app/api/db'
import { ProductId } from '@/app/types/products'

type Action = 'increase' | 'decrease'

export async function PATCH(request: Request) {
  try {
    const { db } = await connectToDb()
    const { productId, action }: { productId: ProductId; action: Action } = await request.json()

    const pId = Number(productId)

    if (action === 'increase') {
      const result = await db
        .collection('user')
        .findOneAndUpdate({ id: '1' }, { $push: { products: pId } } as Document, {
          returnDocument: 'after',
          projection: { products: 1 }
        })
      return NextResponse.json(result?.products ?? [])
    }

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
                      $slice: ['$products', { $add: ['$$idx', 1] }, { $size: '$products' }]
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

    if (!result) {
      const user = await db.collection('user').findOne({ id: '1' }, { projection: { products: 1 } })
      return NextResponse.json(user?.products ?? [])
    }

    return NextResponse.json(result.products ?? [])
  } catch {
    return NextResponse.json({ message: 'Помилка сервера' }, { status: 500 })
  }
}
