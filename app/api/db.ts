import { Db, MongoClient, ServerApiVersion } from 'mongodb'

import { COLLECTIONS, DB_NAME } from '@/app/lib/constants'

declare const process: {
  env?: Record<string, string | undefined>
}

export const getEnvVar = (key: string): string => {
  if (typeof process === 'undefined' || !process.env?.[key]) {
    throw new Error(`Environment variable ${key} is not set`)
  }

  return process.env[key] as string
}

const uri = `mongodb+srv://${getEnvVar('NEXT_MONGO_DB_USERNAME')}:${getEnvVar('NEXT_MONGO_DB_PASSWORD')}@nextjsshop.3y418cz.mongodb.net/?appName=nextJsShop`

let cachedClient: MongoClient | null = null
let cachedDb: Db | null = null
let indexesInitialized = false

export const connectToDb = async (): Promise<{ client: MongoClient; db: Db }> => {
  if (process.env.MONGODB_MOCK) {
    return {
      client: { connect: () => Promise.resolve() } as any,
      db: {
        collection: (name: string) => ({
          find: () => ({
            toArray: () =>
              Promise.resolve(
                name === COLLECTIONS.PRODUCTS
                  ? [
                      {
                        id: 1,
                        name: 'Mock Product',
                        price: 100,
                        image: '/test.png',
                        description: 'Mock Description'
                      }
                    ]
                  : []
              )
          }),
          findOne: () =>
            Promise.resolve(name === COLLECTIONS.USERS ? { id: '1', products: [] } : null),
          updateOne: () => Promise.resolve({ success: true }),
          createIndex: () => Promise.resolve({})
        })
      } as any
    }
  }

  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }

  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true
    }
  })

  await client.connect()

  const db = client.db(DB_NAME)
  cachedClient = client
  cachedDb = db

  if (!indexesInitialized) {
    await Promise.all([
      db.collection(COLLECTIONS.PRODUCTS).createIndex({ id: 1 }, { unique: true }),
      db.collection(COLLECTIONS.USERS).createIndex({ id: 1 }, { unique: true })
    ])
    indexesInitialized = true
  }

  return { client, db }
}
