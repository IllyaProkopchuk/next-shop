import { notFound } from 'next/navigation'

import { connectToDb } from '@/app/api/db'
import { COLLECTIONS, USER_ID } from '@/app/lib/constants'
import { CartItem, Product, ProductId } from '@/app/types/products'

const NO_ID = { projection: { _id: 0 } }

export const getProducts = async (): Promise<Product[]> => {
  const { db } = await connectToDb()
  return db.collection<Product>(COLLECTIONS.PRODUCTS).find({}, NO_ID).toArray()
}

export const getProductById = async (id: ProductId): Promise<Product> => {
  const { db } = await connectToDb()
  const product = await db
    .collection<Product>(COLLECTIONS.PRODUCTS)
    .findOne({ id: Number(id) }, NO_ID)
  if (!product) notFound()
  return product
}

export const getUserProductIds = async (): Promise<ProductId[]> => {
  const { db } = await connectToDb()
  const user = await db
    .collection(COLLECTIONS.USERS)
    .findOne({ id: USER_ID }, { projection: { products: 1 } })
  const products: CartItem[] = user?.products ?? []
  return products.map(p => p.id)
}

export type CartProduct = Product & { quantity: number }

export const getUserCartData = async (): Promise<{
  products: CartProduct[]
}> => {
  const { db } = await connectToDb()
  const user = await db
    .collection(COLLECTIONS.USERS)
    .findOne({ id: USER_ID }, { projection: { products: 1 } })

  const cartItems: CartItem[] = user?.products ?? []

  if (!cartItems.length) {
    return { products: [] }
  }

  const ids = cartItems.map(item => item.id)
  const products = await db
    .collection<Product>(COLLECTIONS.PRODUCTS)
    .find({ id: { $in: ids } }, NO_ID)
    .toArray()

  // Об'єднуємо дані про товар з його кількістю з кошика
  const productsWithQuantity = products.map(product => {
    const cartItem = cartItems.find(item => item.id === product.id)
    return {
      ...product,
      quantity: cartItem?.quantity ?? 0
    }
  })

  return { products: productsWithQuantity }
}
