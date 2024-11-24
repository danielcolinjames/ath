import { getImg } from "../colors";
import { createClient } from "../supabase/server";

export const cg = (path: string) =>
  `${path}?x_cg_pro_api_key=${process.env.COINGECKO_API_KEY}`;

const buildUrl = (path: string, params: Record<string, string>) => {
  const baseUrl = "https://pro-api.coingecko.com/api/v3";
  const urlParams = {
    x_cg_pro_api_key: process.env.COINGECKO_API_KEY,
    vs_currency: "usd",
    order: "market_cap_desc",
    per_page: "250",
    page: "1",
    sparkline: "false",
  };
  const url = new URL(baseUrl + path);
  Object.entries(urlParams).forEach(([key, value]) => {
    url.searchParams.append(key, value || "");
  });
  return url.toString();
};

// onchain/simple/networks/eth/token_price/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2

export const getList = async () => {
  const response = await fetch(buildUrl("/coins/list", {}));
  return response.json();
};

export const getMarketData = async (ids: string[]) => {
  const idsString = ids.join(",");
  const response = await fetch(
    buildUrl(`/coins`, { vs_currency: "usd", ids: idsString }),
  );
  const data = await response.json();
  if (!Array.isArray(data)) {
    console.error("Unexpected response from CoinGecko:", data);
    return [];
  }
  return data;
};
