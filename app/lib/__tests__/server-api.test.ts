import { beforeEach, describe, expect, it, vi } from 'vitest'

import { connectToDb } from '@/app/api/db'
import { COLLECTIONS } from '@/app/lib/constants'

import { getProducts, getUserCartData } from '../server-api'

vi.mock('@/app/api/db', () => ({
  connectToDb: vi.fn(),
  getEnvVar: vi.fn(key => `mock_${key}`)
}))

vi.mock('next/navigation', () => ({
  notFound: vi.fn()
}))

describe('server-api', () => {
  const mockDb = {
    collection: vi.fn()
  }

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(connectToDb).mockResolvedValue({ db: mockDb as unknown as any })
  })

  it('getProducts returns all products', async () => {
    const mockProducts = [{ id: 1, name: 'Product 1' }]
    const mockCollection = {
      find: vi.fn().mockReturnThis(),
      toArray: vi.fn().mockResolvedValue(mockProducts)
    }
    mockDb.collection.mockReturnValue(mockCollection)

    const result = await getProducts()
    expect(result).toEqual(mockProducts)
  })

  it('getUserCartData returns combined cart data', async () => {
    const mockUser = { products: [{ id: 1, quantity: 2 }] }
    const mockProducts = [{ id: 1, name: 'Product 1', price: 100 }]

    const usersCollection = {
      findOne: vi.fn().mockResolvedValue(mockUser)
    }
    const productsCollection = {
      find: vi.fn().mockReturnThis(),
      toArray: vi.fn().mockResolvedValue(mockProducts)
    }

    mockDb.collection.mockImplementation(name => {
      if (name === COLLECTIONS.USERS) return usersCollection
      if (name === COLLECTIONS.PRODUCTS) return productsCollection
      return {
        findOne: vi.fn(),
        find: vi.fn().mockReturnThis(),
        toArray: vi.fn().mockResolvedValue([])
      }
    })

    const result = await getUserCartData()
    expect(result.products).toEqual([{ ...mockProducts[0], quantity: 2 }])
  })
})
