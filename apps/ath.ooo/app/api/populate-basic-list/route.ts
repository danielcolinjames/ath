import type { NextRequest } from 'next/server';
import { getList, getMarketData } from '../../../lib/coingecko/data';
import { createClient } from '../../../lib/supabase/server';

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const isLocalhost = request.headers.get('host')?.includes('localhost') || request.headers.get('host')?.includes('127.0.0.1');

  if (!isLocalhost && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', {
      status: 401,
    });
  }

  try {
    const list = await getList();
    await populateBasicCryptoAssets(list);
    return Response.json({ success: true, message: 'Crypto assets updated successfully' });
  } catch (error) {
    console.error('Error updating crypto assets:', error);
    return Response.json({ success: false, message: 'Error updating crypto assets' }, { status: 500 });
  }
}

async function populateBasicCryptoAssets(list: any[]) {
  const supabase = createClient();
  console.log(`Processing ${list.length} coins`);

  let i = 0;
  for (const coin of list) {
    i++;
    // First, check if the asset already exists
    const { data: existingAsset, error: fetchError } = await supabase
      .from('crypto_assets')
      .select('symbol, name')
      .eq('coingecko_id', coin.id)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {  // PGRST116 is the error code for no rows returned
      console.error(`Error fetching existing asset for ${coin.id}:`, fetchError);
      continue;
    }

    // If the asset exists and has the same symbol and name, skip it
    if (existingAsset && 
        existingAsset.symbol === coin.symbol.toLowerCase() && 
        existingAsset.name === coin.name) {
      // comment every 10%
      if (i % 100 === 0) {
        console.log(`Skipping ${coin.name} (${coin.symbol}), no changes detected`);
      }
      continue;
    }

    // If we're here, we need to upsert the asset
    const { error } = await supabase
      .from('crypto_assets')
      .upsert({
        coingecko_id: coin.id,
        symbol: coin.symbol.toLowerCase(),
        name: coin.name,
      }, {
        onConflict: 'coingecko_id'
      });

    if (error) {
      // console.error(`Error upserting basic info for ${coin.id}:`, error);
    } else {
      // comment every 10%
      if (i % 100 === 0) {
        console.log(`Successfully upserted basic info: ${coin.name} (${coin.symbol})`);
      }
    }
  }

  console.log('Finished populating basic crypto asset info');
}
