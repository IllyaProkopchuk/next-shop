import { connectToDb } from '@/app/api/db'
import { ProductId } from '@/app/types/products'
import { request } from 'http'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { db } = await connectToDb()
  const { searchParams } = new URL(request.url)
  const min = searchParams.get('min') === 'true'

  const user = await db.collection('user').findOne({ id: '1' })

  if (!user || !user.products) {
    return new Response(JSON.stringify([]), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  const userProducts: ProductId[] = user.products || []

  if (min) {
    return new Response(JSON.stringify(userProducts), { status: 200 })
  }

  const products = await db
    .collection('products')
    .find({ id: { $in: userProducts } })
    .toArray()

  return new Response(JSON.stringify(products), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  })
}

export async function PATCH(request: Request) {
  try {
    const { db } = await connectToDb()
    const { productId } = await request.json()

    const pId = Number(productId)

    const result = await db.collection('user').findOneAndUpdate(
      { id: '1' },
      { $addToSet: { products: pId } },
      {
        returnDocument: 'after',
        projection: { products: 1 }
      }
    )

    if (!result) {
      return NextResponse.json({ message: 'Користувача не знайдено' }, { status: 404 })
    }

    // Повертаємо тільки масив ID
    return NextResponse.json(result.products)
  } catch (error) {
    return NextResponse.json({ message: 'Помилка сервера' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { db } = await connectToDb()
    const { productId } = await request.json()

    const pId = Number(productId)

    const result = await db.collection('user').findOneAndUpdate(
      { id: '1' },
      { $pull: { products: pId } },
      {
        returnDocument: 'after',
        projection: { products: 1 }
      }
    )

    if (!result) {
      return NextResponse.json({ message: 'Користувача не знайдено' }, { status: 404 })
    }

    return NextResponse.json(result.products)
  } catch (error) {
    return NextResponse.json({ message: 'Помилка сервера' }, { status: 500 })
  }
}
