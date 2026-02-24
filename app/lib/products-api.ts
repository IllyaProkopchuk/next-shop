import { notFound } from 'next/navigation'

import { AxiosError } from 'axios'

import httpClient from '@/app/lib/axios-client'
import { Product, ProductId } from '@/app/types/products'

export const getProducts = async (): Promise<Product[]> => {
  const { data } = await httpClient.get<Product[]>('/api/products')

  return data
}

export const getProductById = async (id: ProductId): Promise<Product> => {
  try {
    const { data } = await httpClient.get<Product>(`/api/products/${id}`)

    if (!data) {
      notFound()
    }

    return data
  } catch (err: unknown) {
    if (err instanceof AxiosError && err.response?.status === 404) {
      notFound()
    }

    throw new Error('Помилка при завантаженні товару')
  }
}

export const addProductToUser = async (productId: ProductId) => {
  const { data } = await httpClient.patch('/api/user/card', {
    productId
  })

  return data
}

export const getUserProducts = async <T extends boolean = false>(
  min: T = false as T
): Promise<T extends true ? ProductId[] : Product[]> => {
  const { data } = await httpClient.get<Promise<T extends true ? ProductId[] : Product[]>>(
    '/api/user/card',
    {
      params: {
        min
      }
    }
  )

  return data || []
}

export const removeProductFromCart = async (productId: ProductId): Promise<ProductId[]> => {
  const { data } = await httpClient.delete('/api/user/card', {
    data: { productId }
  })

  return data
}

export const changeCartItemQuantity = async (
  productId: ProductId,
  action: 'increase' | 'decrease'
): Promise<ProductId[]> => {
  const { data } = await httpClient.patch<ProductId[]>('/api/user/card/quantity', {
    productId,
    action
  })

  return data ?? []
}
