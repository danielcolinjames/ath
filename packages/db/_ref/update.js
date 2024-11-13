const {
  connect,
  disconnect,
  getClient,
  ID_MAP_COLLECTION_NAME,
} = require("./db");

async function main() {
  try {
    await connect();
    const client = getClient();
    const db = client.db("ath");

    const cgList = await fetchList();

    // Transform cgList into the desired structure
    const symbolMap = cgList.reduce((acc, item) => {
      const { symbol, ...rest } = item;
      if (!acc[symbol]) acc[symbol] = [];
      acc[symbol].push(rest);
      return acc;
    }, {});

    const collection = db.collection(ID_MAP_COLLECTION_NAME);

    // Update each symbol in the database
    for (const [symbol, items] of Object.entries(symbolMap)) {
      await collection.updateOne(
        { symbol },
        { $set: { items } },
        { upsert: true },
      );
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await disconnect();
  }
}

async function fetchList() {
  const res = await fetch("https://api.coingecko.com/api/v3/coins/list");
  const list = await res.json();
  return list;
}

main().catch();
