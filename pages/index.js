import { useEffect } from "react";
import { useState } from "react";
import MetaTags from "../components/MetaTags";
import Layout from "../components/Layout";
import AssetListItem from "../components/AssetListItem";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import cache from "../utils/cache";
import { fetchList } from "../utils/coingecko";
import AssetCard from "../components/AssetCard";

const HomePage = ({ list }) => {
  const [marketByRecencyLoading, setMarketByRecencyLoading] = useState(false);
  const [marketByRecency, setMarketByRecency] = useState([]);

  const [marketByTopLoading, setMarketByTopLoading] = useState(false);
  const [marketByTop, setMarketByTop] = useState([]);

  useEffect(() => {
    const getMarketRecencyData = async () => {
      setMarketByRecencyLoading(true);
      const marketRes = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?order_string=market_cap_desc&vs_currency=usd&per_page=250"
      );
      const marketUnsorted = await marketRes.json();
      const market = marketUnsorted.sort((a, b) => {
        return a.ath_date < b.ath_date ? 1 : b.ath_date < a.ath_date ? -1 : 0;
      });
      setMarketByRecency(market);
      setMarketByRecencyLoading(false);
    };

    const getMarketTopData = async () => {
      setMarketByTopLoading(true);
      const marketRes = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?order_string=market_cap_desc&vs_currency=usd&per_page=10"
      );
      const marketUnsorted = await marketRes.json();
      setMarketByTop(marketUnsorted);
      setMarketByTopLoading(false);
    };

    getMarketRecencyData();
    getMarketTopData();
  }, []);

  return (
    <Layout assetList={list} className="">
      <div
        className="p-5 mx-auto max-w-4xl"
        style={{ minHeight: "calc(100vh - 113px)" }}
      >
        <MetaTags
          title={"ATH.ooo — All-Time Highs"}
          description={`See the all-time highs of crypto assets`}
          openGraphImageAbsoluteUrl={`https://ath.ooo/logo/2/og.png`}
          url={`https://ath.ooo/`}
        />
        <div className="pt-5 pb-10 max-w-md mb-10">
          <h1 className="text-xl md:text-3xl font-ath font-black mb-1">
            ath.ooo
          </h1>
          <h2 className="text-gray-700 text-lg md:text-2xl font-ath font-semi-bold mb-2">
            All-Time High Crypto Prices
          </h2>
          <p className="text-md md:text-md font-ath text-gray-500">
            This website displays the highest ever recorded price in US Dollars
            that someone has paid for any given crypto asset. Everything on here
            is powered by CoinGecko's API.
          </p>
        </div>
        {!marketByTopLoading ? (
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {marketByTop.map((asset, i) => (
              <AssetCard asset={asset} index={i} showTimeSince />
            ))}
          </ul>
        ) : (
          <SkeletonTheme color="#efefef" highlightColor="white">
            <Skeleton count={10} height={97} />
          </SkeletonTheme>
        )}
        {!marketByRecencyLoading ? (
          <ul className="flex flex-col">
            {marketByRecency.map((asset, i) => {
              if (i < 200)
                return (
                  <AssetListItem
                    asset={asset}
                    index={i}
                    showGreenLine
                    showTimeSince
                  />
                );
            })}
          </ul>
        ) : (
          <SkeletonTheme color="#efefef" highlightColor="white">
            <Skeleton count={10} height={97} />
          </SkeletonTheme>
        )}
      </div>
    </Layout>
  );
};

export async function getServerSideProps() {
  const list = await cache.fetch("ath:full-list", fetchList, 60 * 60 * 24);

  return {
    props: { list },
  };
}

export default HomePage;
