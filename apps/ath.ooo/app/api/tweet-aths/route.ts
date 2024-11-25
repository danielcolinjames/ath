import { NextResponse } from "next/server";
import { TwitterApi } from "twitter-api-v2";
import { createClient } from "../../../lib/supabase/cli";
import { differenceInMinutes, parseISO } from "date-fns";
import { formatNumber } from "../../../../../packages/utils/numbers";
import { AssetDetails } from "../../../lib/db";

const client = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY!,
  appSecret: process.env.TWITTER_API_SECRET!,
  accessToken: process.env.TWITTER_ACCESS_TOKEN!,
  accessSecret: process.env.TWITTER_ACCESS_SECRET!,
});

export async function GET() {
  try {
    const supabase = createClient();
    let tweetsPosted = 0;

    // 1. Get all recent ATHs
    const { data: recentAssets } = await supabase
      .from("asset_details")
      .select("*")
      // last 5 minutes
      .gte("ath_date", new Date(Date.now() - 5 * 60 * 1000).toISOString());
    console.log(
      `Found ${recentAssets?.length} assets with recent ATHs:`,
      recentAssets?.map((a) => ({
        symbol: a.symbol,
        ath_date: a.ath_date,
        minutes_ago: Math.abs(
          differenceInMinutes(parseISO(a.ath_date), new Date()),
        ),
      })),
    );
    if (!recentAssets) {
      return NextResponse.json({ success: false, error: "No assets found" });
    }

    // 2. Group assets by ticker
    const assetsByTicker = recentAssets.reduce(
      (acc, asset) => {
        const ticker = asset.symbol.toLowerCase();
        if (!acc[ticker]) acc[ticker] = [];
        acc[ticker].push(asset);
        return acc;
      },
      {} as Record<string, AssetDetails[]>,
    );

    console.log(
      "Assets grouped by ticker:",
      Object.entries(assetsByTicker).map(([ticker, assets]) => ({
        ticker,
        count: (assets as AssetDetails[]).length,
        market_caps: (assets as AssetDetails[]).map((a) => a.market_cap),
      })),
    );

    // 3. For each ticker group, determine if we should tweet
    const assetsToTweet: AssetDetails[] = [];

    for (const [ticker, assets] of Object.entries(assetsByTicker) as [
      string,
      AssetDetails[],
    ][]) {
      // Replace the ticker group check (around line 68-86) with:
      if (assets.length === 1) {
        // Even for single asset, check if it's the highest mcap for this ticker
        const { data: allAssetsWithTicker } = await supabase
          .from("asset_details")
          .select("*")
          .eq("symbol", assets[0]!.symbol.toLowerCase());

        if (!allAssetsWithTicker?.length) {
          console.log(`No assets found for ticker ${ticker}, skipping`);
          continue;
        }

        const validAssets = allAssetsWithTicker.filter(
          (a) => a.market_cap != null,
        );
        if (validAssets.length > 0) {
          const highestMcap = validAssets.reduce((a, b) =>
            a.market_cap > b.market_cap ? a : b,
          );

          if (highestMcap.coingecko_id === assets[0]!.coingecko_id) {
            console.log(
              `Adding ${assets[0]!.symbol} to tweet list (highest mcap)`,
            );
            assetsToTweet.push(assets[0]!);
          } else {
            console.log(
              `${assets[0]!.symbol} not highest market cap, skipping`,
            );
          }
        }
      } else {
        // Multiple assets - find the one with highest market cap across ALL assets with this ticker
        const { data: allAssetsWithTicker } = await supabase
          .from("asset_details")
          .select("*")
          .eq("symbol", ticker);

        const validAssets = (allAssetsWithTicker || []).filter(
          (a) => a.market_cap != null,
        );
        if (validAssets.length > 0) {
          const highestMcap = validAssets.reduce((a, b) =>
            a.market_cap > b.market_cap ? a : b,
          );

          // Only add if one of our recent ATH assets is the highest mcap
          const recentHighMcap = assets.find(
            (a) => a.coingecko_id === highestMcap.coingecko_id,
          );
          if (recentHighMcap) {
            console.log(
              `Adding ${recentHighMcap.symbol} to tweet list (highest mcap)`,
            );
            assetsToTweet.push(recentHighMcap);
          } else {
            console.log(
              `${ticker} recent ATHs not highest market cap, skipping`,
            );
          }
        }
      }
    }
    console.log(
      "Assets selected for tweeting:",
      assetsToTweet.map((a) => ({
        symbol: a.symbol,
        ath_date: a.ath_date,
        minutes_ago: Math.abs(
          differenceInMinutes(parseISO(a.ath_date), new Date()),
        ),
      })),
    );

    // 4. Tweet about each asset
    for (const asset of assetsToTweet) {
      const { data: existingTweets } = await supabase
        .from("tweeted_aths")
        .select()
        .eq("coingecko_id", asset.coingecko_id);

      // Compare dates in JS after normalizing them
      const existingTweet = existingTweets?.find(
        (tweet) =>
          parseISO(tweet.ath_date).toISOString() ===
          parseISO(asset.ath_date).toISOString(),
      );

      console.log("Checking ATH dates:", {
        asset_ath: parseISO(asset.ath_date).toISOString(),
        existing_aths: existingTweets?.map((t) =>
          parseISO(t.ath_date).toISOString(),
        ),
      });
      console.log("existingTweet", existingTweet);

      console.log(
        existingTweet
          ? `Tweet already posted about ${asset.symbol} with same ATH timestamp, skipping: ${existingTweet.tweet_id}`
          : `Not tweeted about ${asset.symbol} yet, tweeting...`,
      );

      if (!existingTweet) {
        const displayTicker = asset.symbol.toUpperCase();
        const tweetText = [
          `$${displayTicker} (${asset.name}) just hit a new all-time high of $${formatNumber(asset.ath)}! 🚀`,
          `ath.ooo/${displayTicker.toLowerCase()}`,
        ].join("\n");

        try {
          const tweet = await client.v2.tweet(tweetText);
          tweetsPosted++;

          await supabase.from("tweeted_aths").insert({
            coingecko_id: asset.coingecko_id,
            ath_date: asset.ath_date,
            ticker: asset.symbol.toLowerCase(),
            ath_value: asset.ath,
            tweet_id: tweet.data.id,
            tweet_text: tweetText,
          });

          console.log(`Tweeted about ${asset.name}'s ATH`);
        } catch (error) {
          console.error(`Error posting tweet for ${asset.name}:`, error);
        }
      } else {
        console.log(
          `Already tweeted about ${asset.symbol} with same ATH timestamp, skipping`,
        );
      }
    }

    return NextResponse.json({ success: true, tweetsPosted });
  } catch (error) {
    console.error("Error in tweet-aths route:", error);
    return NextResponse.json({ success: false, error: String(error) });
  }
}
