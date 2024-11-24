import { fetchFromCoingecko } from "./coingecko";
import { getImg } from "./colors";
import { createClient } from "./supabase/server";

type AssetDetails = {
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

type AssetDetailsResponse = {
  assets: AssetDetails[];
  stale: boolean;
} | null;

const ASSET_MAPPING_TABLE = "asset_mapping";
const ASSET_DETAILS_TABLE = "asset_details";

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
  const now = new Date();
  const existingIds = new Set(
    existingAssetsFromDb?.map((asset) => asset.coingecko_id) || [],
  );

  // completely new ids to fetch
  const idsToFetch = mapping.coingecko_ids.filter(
    (id: string) => !existingIds.has(id),
  );

  // existing but stale ids to update
  const staleIds =
    existingAssetsFromDb
      ?.filter((asset) => {
        const lastUpdated = new Date(asset.last_updated);
        return now.getTime() - lastUpdated.getTime() > 60000; // 1 minute
      })
      .map((asset) => asset.coingecko_id) || [];

  // combine both sets of ids that need fetching
  const allIdsToFetch = [...idsToFetch, ...staleIds];

  // fetch from coingecko
  if (allIdsToFetch.length > 0) {
    try {
      const newAssetData = await Promise.all(
        allIdsToFetch.map((id) => fetchFromCoingecko(`/coins/${id}`, {})),
      );

      const validAssetData = newAssetData.filter(
        (data): data is NonNullable<typeof data> => data !== null,
      );

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
        .in("coingecko_id", mapping.coingecko_ids)
        .order("market_cap", { ascending: false }); // sort by marketcap

      return {
        assets: freshAssets || [],
        stale: false,
      };
    } catch (error) {
      console.error("Error processing assets:", error);
      // fallback to existing assets if available
      return {
        assets:
          existingAssetsFromDb?.sort((a, b) => {
            if (a.market_cap === null && b.market_cap === null) return 0;
            if (a.market_cap === null) return 1;
            if (b.market_cap === null) return -1;
            return b.market_cap - a.market_cap;
          }) || [],
        stale: true, // indicate that we failed to update
      };
    }
  }

  // if nothing needed updating, return existing assets
  const assets =
    existingAssetsFromDb?.sort((a, b) => {
      // If both market caps are null, maintain original order
      if (a.market_cap === null && b.market_cap === null) return 0;
      // If only a's market cap is null, put it last
      if (a.market_cap === null) return 1;
      // If only b's market cap is null, put it last
      if (b.market_cap === null) return -1;
      // Otherwise sort by market cap descending
      return b.market_cap - a.market_cap;
    }) || [];
  return {
    assets,
    stale: false,
  };
}
