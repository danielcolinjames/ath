// client-side db interactions
import { getCryptoAsset, updateCryptoAsset, getAllCryptoAssets } from '@repo/db'
import { fetchFromCoingecko } from "../lib/coingecko";

export async function getAssetData(ticker: string) {
  try {
    let asset = await getCryptoAsset(ticker);
    
    if (!asset) {
      // If asset doesn't exist in our DB, fetch from CoinGecko and insert
      const cgData = await fetchFromCoingecko('/coins/markets', { vs_currency: 'usd', ids: ticker })
      if (cgData && cgData.length > 0) {
        asset = {
          ticker: cgData[0].symbol,
          coingecko_id: cgData[0].id,
          name: cgData[0].name,
          market_cap: cgData[0].market_cap,
          ath: cgData[0].ath,
          ath_date: cgData[0].ath_date,
          market_cap_rank: cgData[0].market_cap_rank,
          image: cgData[0].image,
          last_updated: new Date().toISOString()
        }
        // TODO: Insert this asset into the database
      } else {
        return null
      }
    }
    
    return asset
  } catch (error) {
    console.error('Error fetching asset data:', error)
    return null
  }
}

export async function updateAssetData(ticker: string) {
  try {
    const cgData = await fetchFromCoingecko('/coins/markets', { vs_currency: 'usd', ids: ticker })
    if (cgData && cgData.length > 0) {
      const updatedAsset = {
        market_cap: cgData[0].market_cap,
        last_updated: new Date().toISOString()
      }
      return await updateCryptoAsset(ticker, updatedAsset)
    }
    return null
  } catch (error) {
    console.error('Error updating asset data:', error)
    return null
  }
}

export { getAllCryptoAssets }