import { getImg } from "../colors";
import { createClient } from "../supabase/server";

export const cg = (path: string) => `${path}?x_cg_pro_api_key=${process.env.COINGECKO_API_KEY}`

const buildUrl = (path: string, params: Record<string, string>) => {
  const baseUrl = "https://pro-api.coingecko.com/api/v3"
  const urlParams = {
    x_cg_pro_api_key: process.env.COINGECKO_API_KEY,
    vs_currency: 'usd',
    order: 'market_cap_desc',
    per_page: '250',
    page: '1',
    sparkline: 'false'
  }
  const url = new URL(baseUrl + path);
  Object.entries(urlParams).forEach(([key, value]) => {
    url.searchParams.append(key, value || '');
  });
  return url.toString();
}

// onchain/simple/networks/eth/token_price/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2

export const getList = async () => {
  const response = await fetch(buildUrl('/coins/list', {}))
  return response.json()
}

export const getMarketData = async (ids: string[]) => {
  const idsString = ids.join(',');
  const response = await fetch(buildUrl(`/coins`, { vs_currency: 'usd', ids: idsString }));
  const data = await response.json();
  if (!Array.isArray(data)) {
    console.error('Unexpected response from CoinGecko:', data);
    return [];
  }
  return data;
}

export const updateAssetDetails = async (id: string) => {
  const supabase = createClient();

  const response = await fetch(buildUrl(`/coins/${id}`, { vs_currency: 'usd' }));
  const coin = await response.json();
  // const coin = data;

  // console.log(coin)
  // console.log(data)
  console.log(coin)
  console.log("TESTING!!! ", id)

  if (!coin) {
    return null;
  }

  const colors = await getImg(coin.image.large)

  const accent = colors?.Vibrant?.hex;

  console.log(accent)

  const { error: updateError } = await supabase
    .from('crypto_assets')
    .update({
      accent: accent,
      market_cap: coin.market_cap,
      last_updated: new Date().toISOString(),
      image: coin.image.large,
      // current_price: coin.current_price,
      // market_cap_rank: coin.market_cap_rank,
      // fully_diluted_valuation: coin.fully_diluted_valuation,
      // total_volume: coin.total_volume,
      // high_24h: coin.high_24h,
      // low_24h: coin.low_24h,
      // price_change_24h: coin.price_change_24h,
      // price_change_percentage_24h: coin.price_change_percentage_24h,
      // market_cap_change_24h: coin.market_cap_change_24h,
      // market_cap_change_percentage_24h: coin.market_cap_change_percentage_24h,
      // circulating_supply: coin.circulating_supply,
      // total_supply: coin.total_supply,
      // max_supply: coin.max_supply,
      ath: coin.ath,
      // ath_change_percentage: coin.ath_change_percentage,
      // ath_date: coin.ath_date,
      // atl: coin.atl,
      // atl_change_percentage: coin.atl_change_percentage,
      // atl_date: coin.atl_date,
      // roi: coin.roi,
    })
    .eq('coingecko_id', id);

  // if (updateError) {
  //   console.error('Error updating asset details:', updateError);
  // }
  return { ...coin, accent };
}