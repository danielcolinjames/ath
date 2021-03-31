import { Fragment } from "react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import moment from "moment";
import MetaTags from "../components/MetaTags";
import Layout from "../components/Layout";
import AssetListItem from "../components/AssetListItem";

const HomePage = ({ list, market }) => {
  const [showList, setShowList] = useState(false);

  return (
    <Layout assetList={list}>
      <div className="p-5 mx-auto max-w-4xl">
        <MetaTags
          title={"ATH.ooo — All-Time Highs"}
          description={`See the all-time highs of crypto assets`}
          openGraphImageAbsoluteUrl={`https://ath.ooo/logo/2/og.png`}
          url={`https://ath.ooo/`}
        />
        <div className="pt-5 pb-10">
          <h1 className="text-xl md:text-3xl font-sans font-black mb-3">
            ATH.ooo — All-time high prices in USD
          </h1>
          <p className="text-md md:text-md font-sans text-gray-500">
            This website displays the highest ever recorded price in US Dollars
            that someone has paid for any given crypto asset. This website is
            powered by CoinGecko's API.
          </p>
        </div>
        <ul className="flex flex-col">
          {market.map((asset, i) => {
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
        <button
          className="mt-20 bg-gray-200 p-2 rounded-lg"
          onClick={() => setShowList(!showList)}
        >
          {showList ? "Hide" : "Show"} more assets{" "}
        </button>
        {showList && (
          <ul className="text-gray-400">
            {list.map((asset) => (
              <li className="list-disc ml-8 pt-2">
                <Link href={`/${asset.symbol}`}>
                  <a>
                    {asset.symbol.toUpperCase()} ({asset.name})
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Layout>
  );
};

export async function getServerSideProps() {
  const listRes = await fetch("https://api.coingecko.com/api/v3/coins/list");
  const list = await listRes.json();

  const marketRes = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?order_string=market_cap_desc&vs_currency=usd&per_page=100"
  );
  const marketUnsorted = await marketRes.json();
  const market = marketUnsorted.sort((a, b) => {
    return a.ath_date < b.ath_date ? 1 : b.ath_date < a.ath_date ? -1 : 0;
  });
  return {
    props: { list, market },
  };
}

export default HomePage;
