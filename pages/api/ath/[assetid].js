import { fetchList } from "../../../utils/coingecko";
import cache from "../../../utils/cache";

export default async function handler(req, res) {
  const {
    query: { assetid },
  } = req;

  const list = await cache.fetch("ath:full-list", fetchList, 60 * 60 * 12);

  const asset = list.find((x) => {
    return x.symbol.toLowerCase() === assetid.toLowerCase();
  });

  const matchingAssets = list.filter((x) => {
    return x.symbol.toLowerCase() === assetid.toLowerCase();
  });

  if (matchingAssets.length === 0) {
    res.status(404).json({ error: "Not found" });
    return;
  } else {
    try {
      const singleAssetMatch = matchingAssets.length === 1;
      let assetCoingeckoId = "";

      if (singleAssetMatch) {
        assetCoingeckoId = asset.id;
      } else {
        // multiple found with same ticker symbol
        const multipleAssetsArray = [];
        matchingAssets.map((matchingAssetObject) => {
          multipleAssetsArray.push(matchingAssetObject.id);
        });
        assetCoingeckoId = multipleAssetsArray.join(",");
      }
      const assetsResponse = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${assetCoingeckoId}`
      );
      const assetInfo = await assetsResponse.json();

      const arrayOfResults = assetInfo.map((a) => ({
        ticker: assetid.toUpperCase(),
        name: a.name,
        ath: a.ath,
        ath_date: a.ath_date,
        mc: a.market_cap,
        rank: a.market_cap_rank ? a.market_cap_rank : null,
        logo: a.image,
      }));
      res.status(200).json(arrayOfResults);
    } catch (e) {
      console.error(e);
    }
  }
}
