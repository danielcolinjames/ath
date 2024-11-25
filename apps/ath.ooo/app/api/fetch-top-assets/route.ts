import "dotenv/config";
import { fetchFromCoingecko } from "../../../lib/coingecko";
import { createClient } from "../../../lib/supabase/cli";
import { getImg } from "../../../lib/colors";
import { NextResponse } from "next/server";
export async function GET() {
  try {
    console.log("Fetching market data from CoinGecko...");
    let allMarketData: any[] = [];
    const pages = 10; // 10 pages of 100 = 1000 assets

    for (let page = 1; page <= pages; page++) {
      console.log(`Fetching page ${page} of ${pages}...`);
      const marketData = await fetchFromCoingecko("/coins/markets", {
        vs_currency: "usd",
        order: "market_cap_desc",
        per_page: "100",
        page: page.toString(),
        sparkline: "false",
      });

      // Add debug logging
      console.log(`Page ${page} returned ${marketData?.length || 0} assets`);
      if (!marketData?.length) {
        console.log("Market data response:", marketData);
      }

      allMarketData = [...allMarketData, ...marketData];

      // Add a small delay to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    console.log(`Fetched ${allMarketData.length} assets total`);
    const supabase = createClient();

    let updatedCount = 0;
    let errorCount = 0;

    // Process each asset
    for (const asset of allMarketData) {
      try {
        const colors = await getImg(asset.image.large);
        const accent = colors?.Vibrant?.hex ?? "#555";

        const { error } = await supabase.from("asset_details").upsert({
          coingecko_id: asset.id,
          name: asset.name,
          symbol: asset.symbol,
          image: asset.image,
          current_price: asset.current_price,
          market_cap: asset.market_cap,
          market_cap_rank: asset.market_cap_rank,
          ath: asset.ath,
          ath_date: asset.ath_date,
          last_updated: new Date().toISOString(),
          accent: accent,
        });

        if (error) {
          console.error(`Error upserting ${asset.symbol}:`, error);
          errorCount++;
        } else {
          updatedCount++;
        }

        if (updatedCount % 100 === 0) {
          console.log(
            `Updated ${updatedCount} assets (${errorCount} errors)...`,
          );
        }
      } catch (error) {
        console.error(`Error processing ${asset.symbol}:`, error);
        errorCount++;
      }
    }

    console.log("\nUpdate complete!");
    console.log(`Total assets fetched: ${allMarketData.length}`);
    console.log(`Assets updated: ${updatedCount}`);
    console.log(`Errors encountered: ${errorCount}`);

    return NextResponse.json({
      success: true,
      processed: allMarketData.length,
      updated: updatedCount,
      errors: errorCount,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({
      success: false,
      error: error,
    });
  }
}
