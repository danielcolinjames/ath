import { NextRequest } from "next/server";
import { getMarketData } from "../../../lib/coingecko/data";
import { createClient } from "../../../lib/supabase/server";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const isLocalhost = request.headers.get('host')?.includes('localhost') || request.headers.get('host')?.includes('127.0.0.1');

  if (!isLocalhost && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', {
      status: 401,
    });
  }

  try {
    await updateMarketCaps();
    return Response.json({ success: true, message: 'Crypto assets updated successfully' });
  } catch (error) {
    console.error('Error updating crypto assets:', error);
    return Response.json({ success: false, message: 'Error updating crypto assets' }, { status: 500 });
  }
}

async function updateMarketCaps() {
  const supabase = createClient();
  const batchSize = 250;
  const maxIterations = 1000;

  let i = 0;
  for (let iteration = 0; iteration < maxIterations; iteration++) {
    i++;
    const { data: assets, error } = await supabase
      .from('crypto_assets')
      .select('coingecko_id')
      .is('market_cap', null)
      .limit(batchSize);

    if (error) {
      console.error('Error fetching assets:', error);
      break;
    }

    if (assets.length === 0) {
      console.log('No more assets to update');
      break;
    }

    const marketData = await getMarketData(assets.map(asset => asset.coingecko_id));

    console.log(marketData)

    for (const coin of marketData) {
      const { error: updateError } = await supabase
        .from('crypto_assets')
        .update({
          market_cap: coin.market_cap || 0,
          last_updated: new Date().toISOString(),
          image: coin.image,
        })
        .eq('coingecko_id', coin.id);

      if (updateError) {
        console.error(`Error updating market cap for ${coin.id}:`, updateError);
      } else {
        // console.log(`Successfully updated market cap: ${coin.name} (${coin.symbol})`);
        if (i % 100 === 0) {
          console.log(`Successfully updated market cap: ${coin.name} (${coin.symbol})`);
        }
      }
    }

    if (assets.length < batchSize) {
      console.log('Processed all assets needing updates');
      break;
    }
  }

  console.log('Finished updating market caps');
}