import { NextResponse } from 'next/server'

import { connectToDb } from '@/app/api/db'
import { ProductId } from '@/app/types/products'

type Action = 'increase' | 'decrease'

export async function PATCH(request: Request) {
  try {
    const { db } = await connectToDb()
    const { productId, action }: { productId: ProductId; action: Action } = await request.json()

    const pId = Number(productId)

    const user = await db.collection('user').findOne<{ products?: ProductId[] }>({ id: '1' })

    const currentProducts: ProductId[] = user?.products ?? []

    let updatedProducts: ProductId[]

    if (action === 'increase') {
      updatedProducts = [...currentProducts, pId]
    } else {
      const index = currentProducts.indexOf(pId)

      if (index === -1) {
        return NextResponse.json(currentProducts)
      }

      updatedProducts = [
        ...currentProducts.slice(0, index),
        ...currentProducts.slice(index + 1, currentProducts.length)
      ]
    }

    await db
      .collection('user')
      .updateOne({ id: '1' }, { $set: { products: updatedProducts } }, { upsert: true })

    return NextResponse.json(updatedProducts)
  } catch {
    return NextResponse.json({ message: 'Помилка сервера' }, { status: 500 })
  }
}
