import { fetchList } from '../lib/coingecko'
import { insertCryptoAsset } from '@repo/db'

async function updateCryptoAssets() {
  try {
    console.log('Fetching coin list from CoinGecko...')
    const coinList = await fetchList()
    
    console.log(`Updating ${coinList.length} coins in the database...`)
    for (const coin of coinList) {
      await insertCryptoAsset({
        ticker: coin.symbol.toLowerCase(),
        coingecko_id: coin.id,
        name: coin.name,
        market_cap: 0, // We'll update this later
        last_updated: new Date().toISOString()
      })
    }
    
    console.log('Crypto assets updated successfully')
  } catch (error) {
    console.error('Error updating crypto assets:', error)
  }
}

updateCryptoAssets()