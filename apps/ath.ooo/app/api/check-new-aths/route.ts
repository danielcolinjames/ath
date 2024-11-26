import "dotenv/config";
import { fetchFromCoingecko } from "../../../lib/coingecko";
import { differenceInMinutes, parseISO } from "date-fns";
import { createClient } from "../../../lib/supabase/cli";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }
  try {
    console.log("Fetching market data from CoinGecko...");
    const marketData = await fetchFromCoingecko("/coins/markets", {
      vs_currency: "usd",
      order: "market_cap_desc",
      per_page: "1000",
      sparkline: "false",
    });

    console.log(`Fetched ${marketData.length} assets`);
    const supabase = createClient();

    let updatedCount = 0;
    let newAthCount = 0;

    // Process each asset
    for (const asset of marketData) {
      const athDate = parseISO(asset.ath_date);
      const recencyInMinutes = Math.abs(
        differenceInMinutes(athDate, new Date()),
      );

      console.log(
        `${asset.symbol.toUpperCase()}: ${recencyInMinutes} minutes since ATH`,
      );

      if (recencyInMinutes <= 60) {
        newAthCount++;
        console.log(
          `New ATH found for ${asset.symbol.toUpperCase()}: $${asset.ath}`,
        );
      }

      try {
        await supabase.from("asset_details").upsert({
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
        });
        updatedCount++;
      } catch (error) {
        console.error(`Error updating ${asset.symbol}:`, error);
      }
    }

    console.log("\nUpdate complete!");
    console.log(`Total assets processed: ${marketData.length}`);
    console.log(`Assets updated: ${updatedCount}`);
    console.log(`New ATHs found: ${newAthCount}`);
    return NextResponse.json({
      success: true,
      processed: marketData.length,
      updated: updatedCount,
      newATHs: newAthCount,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({
      success: false,
      error: error,
    });
  }
}
