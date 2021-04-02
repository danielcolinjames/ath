import { Fragment, useEffect } from "react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import moment from "moment";
import MetaTags from "../components/MetaTags";
import Layout from "../components/Layout";
import AssetListItem from "../components/AssetListItem";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const HomePage = ({ list }) => {
  const [marketLoading, setMarketLoading] = useState(false);
  const [market, setMarket] = useState([]);

  useEffect(() => {
    const getMarketData = async () => {
      setMarketLoading(true);
      const marketRes = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?order_string=market_cap_desc&vs_currency=usd&per_page=250"
      );
      const marketUnsorted = await marketRes.json();
      const market = marketUnsorted.sort((a, b) => {
        return a.ath_date < b.ath_date ? 1 : b.ath_date < a.ath_date ? -1 : 0;
      });
      setMarket(market);
      setMarketLoading(false);
    };
    getMarketData();
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
        {!marketLoading ? (
          <ul className="flex flex-col">
            {market.map((asset, i) => {
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
  const listRes = await fetch("https://api.coingecko.com/api/v3/coins/list");
  const list = await listRes.json();

  return {
    props: { list },
  };
}

export default HomePage;
