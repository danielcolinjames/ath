require("dotenv").config()
import { MongoClient } from "mongodb"
import { ID_MAP_COLLECTION_NAME, DB_NAME } from "@repo/db/constants"

const uri = process.env.MONGODB_URI
let cachedClient = null

export async function connectToDatabase() {
  // if (cachedClient) {
  //   return { dbClient: cachedClient, db: cachedClient.db() }
  // }

  const client = await MongoClient.connect(uri)

  cachedClient = client
  return { dbClient: client, db: client.db(DB_NAME) }
}

async function testConnection() {
  const uri = process.env.MONGODB_URI
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  try {
    await client.connect()
    const db = client.db(DB_NAME) // Add your database name if necessary
    const collections = await db.collections()
    console.log(
      "Collections:",
      collections.map((col) => col.collectionName)
    )

    console.log(collections)

    // Optionally, try to fetch documents from your collection
    const documents = await db
      .collection(ID_MAP_COLLECTION_NAME)
      .find({})
      .toArray()
    console.log("Documents found:", documents.length)
  } catch (error) {
    console.error("Connection test failed:", error)
  } finally {
    await client.close()
  }
}

export async function getProjectsByTicker(ticker) {
  // console.log("t", ticker)

  try {
    const { db } = await connectToDatabase()
    const projects = await db
      .collection(ID_MAP_COLLECTION_NAME)
      .find({ symbol: ticker.toLowerCase() })
      .toArray()

    // console.log(projects)
    return projects
  } catch (e) {
    console.log("404")
    console.error(e)
    return null
  }
}
