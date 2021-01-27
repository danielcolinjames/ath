import { Fragment } from "react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import moment from "moment";
import MetaTags from "../components/MetaTags";
import Layout from "../components/Layout";

const HomePage = ({ list, market }) => {
  const [showList, setShowList] = useState(false);

  const url = new URL("https://og.ath.ooo");
  url.pathname = `${encodeURIComponent(`All-Time Highs of Crypto Assets.png`)}`;
  url.searchParams.append("theme", "dark");
  url.searchParams.append("md", true);
  url.searchParams.append("fontSize", "64px");
  url.searchParams.append(
    "images",
    "https://ath.ooo/logo/wordmark_transparent_tight.png"
  );
  url.searchParams.append("cornerLogo", "false");
  url.searchParams.append("centered", "true");
  url.searchParams.append("hideHeader", "true");

  return (
    <Layout assetList={list}>
      <div className="p-5 mx-auto max-w-2xl">
        <MetaTags
          title={"ATH.ooo — All-Time Highs"}
          description={`See the all-time highs of crypto assets`}
          openGraphImageAbsoluteUrl={url}
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
            const athTimestamp = moment.utc(asset.ath_date);
            return (
              <Fragment key={i}>
                <div className="pt-2">
                  <div className="flex flex-row justify-between">
                    <span className="w-2/3">
                      <Link href={`/${asset.symbol}`}>
                        <a>
                          <div className="flex flex-row items-center py-2 pr-3">
                            <Image
                              src={asset.image}
                              className="max-h-6"
                              height={20}
                              width={20}
                              alt={`${asset.name} logo`}
                            />
                            <h2 className="font-sans ml-2 font-bold text-md">
                              {asset.name} ({asset.symbol.toUpperCase()})
                            </h2>
                          </div>
                        </a>
                      </Link>
                    </span>
                    <Link href={`/${asset.symbol}`}>
                      <a>
                        <div className="inline-block pt-2">
                          <div className="h-1 md:h-1 bg-ath-100 w-full -mb-6 md:-mb-5" />
                          <h3 className="text-2xl md:text-3xl text-black font-sans font-black inline-block mt-4 mb-1">
                            {asset.ath.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                            })}
                          </h3>
                        </div>
                      </a>
                    </Link>
                  </div>
                  <p className="font-sans font-light text-md text-gray-400">
                    Set {athTimestamp.fromNow()}
                  </p>
                </div>
                <div className="mt-5 h-px w-full bg-gray-300" />
              </Fragment>
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

  const market = await marketRes.json();
  // console.log(market);
  return {
    props: { list, market },
    // revalidate: 86400
  };
}

export default HomePage;
