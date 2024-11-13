import { supabase } from './connection'

export async function getCryptoAsset(ticker: string) {
  const { data, error } = await supabase
    .from('crypto_assets')
    .select('*')
    .eq('ticker', ticker.toLowerCase())
    .single()

  if (error) throw error
  return data
}

export async function updateCryptoAsset(ticker: string, updateData: Partial<CryptoAsset>) {
  const { data, error } = await supabase
    .from('crypto_assets')
    .update(updateData)
    .eq('ticker', ticker.toLowerCase())
    .single()

  if (error) throw error
  return data
}

export async function insertCryptoAsset(asset: CryptoAsset) {
  const { data, error } = await supabase
    .from('crypto_assets')
    .insert(asset)
    .single()

  if (error) throw error
  return data
}

export async function getAllCryptoAssets() {
  const { data, error } = await supabase
    .from('crypto_assets')
    .select('*')
    .order('market_cap', { ascending: false })

  if (error) throw error
  return data
}

// Add a type for CryptoAsset
type CryptoAsset = {
  ticker: string
  coingecko_id: string
  name: string
  market_cap: number
  last_updated: string
}