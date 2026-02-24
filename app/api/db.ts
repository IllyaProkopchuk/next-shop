import { Db, MongoClient, ServerApiVersion } from 'mongodb'

const uri = `mongodb+srv://${process.env.NEXT_MONGO_DB_USERNAME}:${process.env.NEXT_MONGO_DB_PASSWORD}@nextjsshop.3y418cz.mongodb.net/?appName=nextJsShop`

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
