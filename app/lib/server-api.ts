import { notFound } from 'next/navigation'

import { connectToDb } from '@/app/api/db'
import { Product, ProductId } from '@/app/types/products'

const NO_ID = { projection: { _id: 0 } }

export const getProducts = async (): Promise<Product[]> => {
  const { db } = await connectToDb()
  return db.collection<Product>('products').find({}, NO_ID).toArray()
}

export const getProductById = async (id: ProductId): Promise<Product> => {
  const { db } = await connectToDb()
  const product = await db.collection<Product>('products').findOne({ id: Number(id) }, NO_ID)
  if (!product) notFound()
  return product
}

export const getUserProductIds = async (): Promise<ProductId[]> => {
  const { db } = await connectToDb()
  const user = await db.collection('user').findOne({ id: '1' }, { projection: { products: 1 } })
  return user?.products ?? []
}

export const getUserCartData = async (): Promise<{
  products: Product[]
  productIds: ProductId[]
}> => {
  const { db } = await connectToDb()
  const user = await db.collection('user').findOne({ id: '1' }, { projection: { products: 1 } })

  const productIds: ProductId[] = user?.products ?? []

  if (!productIds.length) {
    return { products: [], productIds: [] }
  }

  const uniqueIds = [...new Set(productIds)]
  const products = await db
    .collection<Product>('products')
    .find({ id: { $in: uniqueIds } }, NO_ID)
    .toArray()

  return { products, productIds }
}
