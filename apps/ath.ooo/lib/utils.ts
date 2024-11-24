// import { getProjectsByTicker } from "./mongodb";
// import { fetchFromCoingecko } from "./coingecko";
// import { getImg } from "./colors";

import { fetchFromCoingecko } from "./coingecko";
import { createClient } from "./supabase";

// export type AssetInfo = {
//   id: string;
//   symbol: string;
//   name: string;
//   image: string;
//   current_price: number;
//   market_cap: number;
//   market_cap_rank: number;
//   fully_diluted_valuation: number;
//   total_volume: number;
//   high_24h: number;
//   low_24h: number;
//   price_change_24h: number;
//   price_change_percentage_24h: number;
//   market_cap_change_24h: number;
//   market_cap_change_percentage_24h: number;
//   circulating_supply: number;
//   total_supply: number;
//   max_supply: number;
//   ath: number;
//   ath_change_percentage: number;
//   ath_date: string;
//   atl: number;
//   atl_change_percentage: number;
//   atl_date: string;
//   roi: null | {
//     times: number;
//     currency: string;
//     percentage: number;
//   };
//   last_updated: string;
// } & {
//   accentColor: string;
// };

// type AssetData = {
//   mainAsset: AssetInfo | null;
//   otherAssets: AssetInfo[] | null;
// };

export async function getMarketChartDataFromId(
  assetId: string,
  athTimeStamp: string,
) {
  const marketChartData = await fetchFromCoingecko(
    `/coins/${assetId}/market_chart`,
    {
      vs_currency: "usd",
      from: athTimeStamp,
      to: `${Math.floor(Date.now() / 1000)}`,
    },
  );
  return marketChartData;
}

// export async function getAssetDataFromTicker(
//   ticker: string,
// ): Promise<AssetData> {
//   const projectsRaw = await getProjectsByTicker(ticker);

//   if (!projectsRaw || projectsRaw.length == 0) {
//     return { mainAsset: null, otherAssets: null };
//   }

//   const projects = projectsRaw[0]?.items;

//   const assetIds = projects.map((project: any) => project.id).join(",");
//   let assetInfo = await fetchFromCoingecko(`/coins/markets`, {
//     vs_currency: "usd",
//     ids: assetIds,
//   });
//   // console.log(assetInfo)

//   // Sort assetInfo by market cap in descending order
//   assetInfo = assetInfo.sort((a: any, b: any) => {
//     if (typeof a.market_cap === "number" && typeof b.market_cap === "number") {
//       return b.market_cap - a.market_cap;
//     } else if (typeof a.market_cap === "number") {
//       return -1;
//     } else if (typeof b.market_cap === "number") {
//       return 1;
//     } else {
//       return 0;
//     }
//   });

//   for (let i = 0; i < assetInfo.length; i++) {
//     const colors = await getImg(assetInfo[i].image);
//     assetInfo[i].accentColor = colors?.Vibrant?.hex;
//   }

//   return { mainAsset: assetInfo[0], otherAssets: assetInfo.slice(1) };
// }

export const supabaseClient = createClient();
