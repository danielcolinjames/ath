import { fetchFromCoingecko } from '../lib/coingecko';
import { createClient } from '../lib/supabase/server';

async function updateCryptoAssets() {
  try {
    console.log('Fetching coin list from CoinGecko...');
    const coinList = await fetchFromCoingecko('/coins/list', {});

    console.log(coinList);

    // Group CoinGecko IDs by ticker
    const tickerMap = coinList.reduce((acc: { [x: string]: any[]; }, coin: { symbol: string; id: any; }) => {
      const ticker = coin.symbol.toLowerCase();
      if (!acc[ticker]) acc[ticker] = [];
      acc[ticker].push(coin.id);
      return acc;
    }, {});

    const supabase = createClient();

    // Update the asset-mapping table
    for (const [ticker, coingeckoIds] of Object.entries(tickerMap)) {
      const { error } = await supabase
        .from('asset-mapping')
        .upsert({
          ticker,
          coingecko_ids: coingeckoIds,
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'ticker'
        });

      if (error) {
        console.error(`Error upserting asset mapping for ${ticker}:`, error);
      }
    }

    console.log('Asset mapping updated successfully');
  } catch (error) {
    console.error('Error updating crypto assets:', error);
  }
}

updateCryptoAssets();