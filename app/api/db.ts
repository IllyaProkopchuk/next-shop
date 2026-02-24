import { Db, MongoClient, ServerApiVersion } from 'mongodb'

declare const process: {
  env?: Record<string, string | undefined>
}

const getEnvVar = (key: string): string => {
  if (typeof process === 'undefined' || !process.env?.[key]) {
    throw new Error(`Environment variable ${key} is not set`)
  }

  return process.env[key] as string
}

const uri = `mongodb+srv://${getEnvVar('NEXT_MONGO_DB_USERNAME')}:${getEnvVar('NEXT_MONGO_DB_PASSWORD')}@nextjsshop.3y418cz.mongodb.net/?appName=nextJsShop`

let cachedClient: MongoClient | null = null
let cachedDb: Db | null = null

export const connectToDb = async () => {
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

  cachedClient = client
  cachedDb = client.db('shop')

  return { client, db: client.db('shop') }
}
