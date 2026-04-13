import '@testing-library/jest-dom'
import { vi } from 'vitest'

vi.mock('@/app/api/db', () => ({
  connectToDb: vi.fn(() => Promise.resolve({
    db: {
      collection: vi.fn(() => ({
        findOne: vi.fn(),
        updateOne: vi.fn(),
        createIndex: vi.fn(),
      })),
    },
    client: {},
  })),
}))
