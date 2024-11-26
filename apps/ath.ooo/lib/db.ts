import { fetchFromCoingecko } from "./coingecko";
import { getImg } from "./colors";
import { createClient } from "./supabase/server";

export type AssetDetails = {
  coingecko_id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  ath: number;
  ath_date: string;
  last_updated: string;
  accent: string;
};

export type AssetDetailsResponse = {
  assets: AssetDetails[];
} | null;

const ASSET_MAPPING_TABLE = "asset_mapping";
const ASSET_DETAILS_TABLE = "asset_details";

function sortAssetsByMarketCap(a: AssetDetails, b: AssetDetails) {
  // Always prioritize assets with non-null market caps
  if (a.market_cap !== null && b.market_cap === null) return -1;
  if (a.market_cap === null && b.market_cap !== null) return 1;
  if (a.market_cap === null && b.market_cap === null) return 0;
  return b.market_cap - a.market_cap;
}

export async function getAssetDetails(ticker: string) {
  const supabase = createClient();

  // get coingecko ids from asset_mapping
  const { data: mapping } = await supabase
    .from(ASSET_MAPPING_TABLE)
    .select("coingecko_ids")
    .eq("ticker", ticker.toLowerCase())
    .single();

  if (!mapping) {
    return null;
  }

  // get existing details from asset_details
  const { data: existingAssetsFromDb } = await supabase
    .from(ASSET_DETAILS_TABLE)
    .select("*")
    .in("coingecko_id", mapping.coingecko_ids);

  // find which ids need to be fetched (either new or stale)
  const existingIds = new Set(
    existingAssetsFromDb?.map((asset) => asset.coingecko_id) || [],
  );

  // completely new ids to fetch
  const idsToFetch = mapping.coingecko_ids.filter(
    (id: string) => !existingIds.has(id),
  );

  // Try to fetch new data for all IDs, but don't fail if we can't
  try {
    const newAssetData = await Promise.all(
      mapping.coingecko_ids.map((id: string) =>
        fetchFromCoingecko(`/coins/${id}`, {}),
      ),
    );

    const validAssetData = newAssetData.filter(
      (data): data is NonNullable<typeof data> => data !== null,
    );

    if (validAssetData.length > 0) {
      // transform and insert/update assets
      const assetsToUpsert = await Promise.all(
        validAssetData.map(async (data) => {
          const colors = await getImg(data.image.large);
          const accent = colors?.Vibrant?.hex ?? "#555";

          return {
            coingecko_id: data.id,
            name: data.name,
            symbol: data.symbol,
            image: data.image.large,
            current_price: data.market_data.current_price.usd,
            market_cap: data.market_data.market_cap.usd,
            market_cap_rank: data.market_cap_rank,
            ath: data.market_data.ath.usd,
            ath_date: data.market_data.ath_date.usd,
            last_updated: new Date().toISOString(),
            accent: accent,
          };
        }),
      );

      await supabase.from(ASSET_DETAILS_TABLE).upsert(assetsToUpsert).select();

      // get fresh copy of all assets after updates
      const { data: freshAssets } = await supabase
        .from(ASSET_DETAILS_TABLE)
        .select("*")
        .in("coingecko_id", mapping.coingecko_ids);

      return {
        assets: freshAssets?.sort(sortAssetsByMarketCap) || [],
      };
    }
  } catch (error) {
    console.error("Error processing assets:", error);
  }

  // If we couldn't fetch new data or there was an error, return existing data
  return {
    assets: existingAssetsFromDb?.sort(sortAssetsByMarketCap) || [],
  };
}
