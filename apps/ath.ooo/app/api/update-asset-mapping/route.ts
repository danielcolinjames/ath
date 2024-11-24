import { NextRequest, NextResponse } from "next/server";
import { fetchFromCoingecko } from "../../../lib/coingecko";
import { createClient } from "../../../lib/supabase/server";

type TickerMap = {
  [key: string]: string[];
};

type CoinListItem = {
  symbol: string;
  id: string;
};

export async function GET(request: NextRequest) {
  try {
    console.log("Fetching coin list from CoinGecko...");
    const coinList = await fetchFromCoingecko("/coins/list", {});

    console.log(`Fetched ${coinList.length} coins from CoinGecko`);

    // group CoinGecko IDs by ticker
    const tickerMap = (coinList as CoinListItem[]).reduce<TickerMap>(
      (acc, coin) => {
        const ticker = coin.symbol.toLowerCase();
        if (!acc[ticker]) {
          acc[ticker] = [];
        }
        try {
          // tell TypeScript "trust me, this exists"
          acc[ticker]!.push(coin.id);
        } catch (e) {
          console.error(`Error pushing ${coin.id} to ${ticker}:`, e);
        }
        return acc;
      },
      {} as TickerMap,
    );
    const supabase = createClient();

    console.log(
      `Updating ${Object.keys(tickerMap).length} tickers with arrays of matching CoinGecko IDs...`,
    );

    // update the asset_mapping table
    for (const [ticker, coingeckoIds] of Object.entries(tickerMap)) {
      const { error } = await supabase.from("asset_mapping").upsert({
        ticker,
        coingecko_ids: coingeckoIds,
      });

      if (error) {
        console.error(`Error upserting asset mapping for ${ticker}:`, error);
      }
      // else {
      // console.log(`Upserted asset mapping for ${ticker}`);
      // }
    }

    console.log("Asset mapping updated successfully");
    return NextResponse.json(
      { message: "Asset mapping updated successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error updating crypto assets:", error);
    return NextResponse.json(
      { error: "Error updating crypto assets" },
      { status: 500 },
    );
  }
}
