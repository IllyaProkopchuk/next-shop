'use server'

import { revalidatePath } from 'next/cache'

import { connectToDb } from '@/app/api/db'
import { COLLECTIONS, USER_ID } from '@/app/lib/constants'
import { ProductId } from '@/app/types/products'

type ActionResponse = {
  success: boolean
  error?: string
}

// Допоміжна функція для валідації ID
function validateProductId(id: any): number {
  const pId = Number(id)
  if (isNaN(pId) || pId <= 0) {
    throw new Error('Невалідний ID товару')
  }
  return pId
}

export async function addToCartAction(productId: ProductId): Promise<ActionResponse> {
  try {
    const pId = validateProductId(productId)
    const { db } = await connectToDb()

    const user = await db.collection(COLLECTIONS.USERS).findOne({ id: USER_ID, 'products.id': pId })

    if (user) {
      await db
        .collection(COLLECTIONS.USERS)
        .updateOne({ id: USER_ID, 'products.id': pId }, { $inc: { 'products.$.quantity': 1 } })
    } else {
      await db
        .collection(COLLECTIONS.USERS)
        .updateOne({ id: USER_ID }, { $push: { products: { id: pId, quantity: 1 } } } as any)
    }

    revalidatePath('/products')
    revalidatePath('/cart')
    return { success: true }
  } catch (err) {
    console.error('Error in addToCartAction:', err)
    return { success: false, error: 'Не вдалося додати товар до кошика' }
  }
}

export async function removeFromCartAction(productId: ProductId): Promise<ActionResponse> {
  try {
    const pId = validateProductId(productId)
    const { db } = await connectToDb()

    await db
      .collection(COLLECTIONS.USERS)
      .updateOne({ id: USER_ID }, { $pull: { products: { id: pId } } } as any)

    revalidatePath('/products')
    revalidatePath('/cart')
    return { success: true }
  } catch (err) {
    console.error('Error in removeFromCartAction:', err)
    return { success: false, error: 'Не вдалося видалити товар' }
  }
}

export async function changeQuantityAction(
  productId: ProductId,
  action: 'increase' | 'decrease'
): Promise<ActionResponse> {
  try {
    const pId = validateProductId(productId)
    if (action !== 'increase' && action !== 'decrease') {
      throw new Error('Невалідна дія')
    }

    const { db } = await connectToDb()

    if (action === 'increase') {
      await db
        .collection(COLLECTIONS.USERS)
        .updateOne({ id: USER_ID, 'products.id': pId }, { $inc: { 'products.$.quantity': 1 } })
    } else {
      await db.collection(COLLECTIONS.USERS).updateOne(
        {
          id: USER_ID,
          'products.id': pId,
          'products.quantity': { $gt: 1 }
        },
        { $inc: { 'products.$.quantity': -1 } }
      )
    }

    revalidatePath('/cart')
    return { success: true }
  } catch (err) {
    console.error('Error in changeQuantityAction:', err)
    return { success: false, error: 'Не вдалося змінити кількість' }
  }
}

export async function refreshProductsAction() {
  revalidatePath('/products')
}

export async function refreshCartAction() {
  revalidatePath('/cart')
}
