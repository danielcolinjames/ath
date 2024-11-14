import { NextRequest, NextResponse } from 'next/server';
import { fetchFromCoingecko } from '../../../lib/coingecko';
import { createClient } from '../../../lib/supabase/server';

export async function GET(request: NextRequest) {
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

    console.log(`Updating ${Object.keys(tickerMap).length} tickers...`);

    // Update the asset-mapping table
    for (const [ticker, coingeckoIds] of Object.entries(tickerMap)) {
      const { error } = await supabase
        .from('asset-mapping')
        .upsert({
          ticker,
          coingecko_ids: coingeckoIds,
        });

      if (error) {
        console.error(`Error upserting asset mapping for ${ticker}:`, error);
      } else {
        console.log(`Upserted asset mapping for ${ticker}`);
      }
    }

    console.log('Asset mapping updated successfully');
    return NextResponse.json({ message: 'Asset mapping updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error updating crypto assets:', error);
    return NextResponse.json({ error: 'Error updating crypto assets' }, { status: 500 });
  }
}
