import { Db, MongoClient, MongoClientOptions } from 'mongodb'

let cached:{
  conn: { client: MongoClient; db: Db },
  promise: Promise<{ client: MongoClient; db: Db }>
} = global.mongo

if (!cached) {
  cached = global.mongo = { conn: null, promise: null }
}

const connectToDatabase = async (): Promise<{ client: MongoClient; db: Db }> => {
  
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts: MongoClientOptions = {}

    cached.promise = MongoClient.connect(process.env.MONGO_DB_URL, opts).then(client => {
      return {
        client,
        db: client.db(process.env.MONGO_DB_NAME)
      }
    })
  }
  try {
    cached.conn = await cached.promise
    return cached.conn
  } catch (error) {
    console.error(error)
    cached = global.mongo = { conn: null, promise: null }
    return Promise.reject(error)
  }
}

export async function withMongo<T>(fn: (db: Db) => Promise<T>): Promise<T> {
  const conn = await connectToDatabase()
  return await fn(conn.db)
}