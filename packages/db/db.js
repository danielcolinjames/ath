require("dotenv").config()

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb")

export const ID_MAP_COLLECTION_NAME = "cg-full-list-map"

const uri = process.env.MONGODB_URI // Use environment variable for URI
let dbClient = null

export async function queryCollectionById(id) {
  if (!dbClient) {
    console.log("Database not connected. Please connect to the database first.")
    return
  }

  try {
    const collection = dbClient.db().collection(ID_MAP_COLLECTION_NAME)
    // If you're querying by MongoDB's default `_id`
    const query = { _id: ObjectId(id) }
    // Use toArray() for multiple documents. Use findOne() for a single document.
    const result = await collection.find(query).toArray()

    return result
  } catch (error) {
    console.error("Error querying collection by ID:", error)
    throw error
  }
}

// Connect to MongoDB
async function connect() {
  if (dbClient) {
    console.log("Already connected to MongoDB.")
    return
  }
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  })
  await client.connect()
  dbClient = client
  console.log("Successfully connected to MongoDB.")
}

// Disconnect from MongoDB
async function disconnect() {
  if (!dbClient) {
    console.log("No MongoDB connection found.")
    return
  }
  await dbClient.close()
  dbClient = null
  console.log("Disconnected from MongoDB.")
}

// Get MongoDB Client
function getClient() {
  if (!dbClient) {
    throw new Error("You must connect to MongoDB before getting the client.")
  }
  return dbClient
}

module.exports = { connect, disconnect, getClient }
