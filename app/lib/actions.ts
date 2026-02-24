'use server'

import { revalidatePath } from 'next/cache'

export async function refreshProductsAction() {
  revalidatePath('/products')
}

export async function refreshCartAction() {
  revalidatePath('/cart')
}
