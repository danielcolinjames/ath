import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import MetaTags from "../components/MetaTags";
import moment from "moment";

const AssetPage = ({
  asset,
  assetid,
  list,
  assetInfo,
  market,
  singleAssetMatch,
}) => {
  const [showList, setShowList] = useState(false);
  const [showSymbolSharerAssets, setShowSymbolSharerAssets] = useState(false);
  const title = `${assetInfo[0].name} (${assetid.toUpperCase()}) All Time High`;

  const url = new URL("https://og.ath.ooo");
  url.pathname = `${encodeURIComponent(
    `All-Time High: ${asset.name} (${assetid.toUpperCase()})`
  )}.png`;
  url.searchParams.append("theme", "dark");
  url.searchParams.append("md", true);
  url.searchParams.append("fontSize", "94px");
  url.searchParams.append("images", assetInfo[0].image);
  url.searchParams.append("cornerLogo", "true");
  url.searchParams.append("centered", "false");
  url.searchParams.append("heights", 200);

  const athTimestamp = moment.utc(assetInfo[0].ath_date);
  const lastUpdated = moment.utc(assetInfo[0].last_updated);

  return (
    <>
      <div className="bg-black w-full h-4" />
      <div className="py-4 flex justify-start items-center w-full max-w-2xl mx-auto px-5">
        <Link href="/">
          <a className="p-0 m-0 -mb-2">
            <Image
              className="image-override"
              src="/athwordmark.png"
              width={128}
              height={25}
              alt="ATH.ooo logo"
            />
          </a>
        </Link>
      </div>
      <div className="bg-black w-full h-px" />

      <div className="p-5 mx-auto max-w-2xl">
        <MetaTags
          title={title}
          description={`The all-time high assetInfo of ${
            asset.name
          } (${assetid.toUpperCase()}) was ${assetInfo[0].ath.toLocaleString(
            undefined,
            { minimumFractionDigits: 2 }
          )} USD, set ${athTimestamp.fromNow()} on ${moment(
            athTimestamp
          ).format("MMMM Do, YYYY")} at ${moment(athTimestamp).format(
            "h:mm:ss A UTC"
          )}`}
          openGraphImageAbsoluteUrl={url}
          url={`https://ath.ooo/${assetid}`}
        />
        <div>
          <div className="flex flex-row py-2">
            <Image src={assetInfo[0].image} height={28} width={28} />
            <h1 className="font-sans ml-2 font-bold text-xl">
              {assetInfo[0].name} ({assetid.toUpperCase()})
            </h1>
          </div>
          <h2 className="text-3xl font-sans font-black">
            All time high price in USD
          </h2>
          <div className="inline-block">
            <div className="h-2 md:h-3 bg-ath-100 w-full -mb-4 md:-mb-5 mt-5" />
            <h3 className="text-6xl md:text-8xl text-black font-sans font-black inline-block mt-4 mb-4">
              {assetInfo[0].ath.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </h3>
          </div>
          <div>
            <p className="font-sans font-light text-2xl text-gray-400">
              Set {athTimestamp.fromNow()}
            </p>
            <p className="font-sans font-light text-xs text-gray-400">
              on {moment(athTimestamp).format("MMMM Do, YYYY")}
            </p>
            <p className="font-sans font-light text-xs text-gray-400">
              at {moment(athTimestamp).format("h:mm:ss A UTC")}
            </p>
          </div>
          <div className="bg-white p-3 inline-block mt-4 border border-dotted border-gray-100">
            <p className="font-sans font-light text-sm text-gray-300">
              Data accurate as of {lastUpdated.fromNow()}
            </p>
            <div className="h-px bg-gray-200 mt-2" />
            <div className="flex flex-row items-center justify-start pt-2">
              <Image src="/cglogo.svg" height={20} width={20} />
              <a
                target="_blank"
                href={`https://www.coingecko.com/en/coins/${asset.id}/usd`}
                className="font-sans font-light text-xs text-gray-300 leading-none px-2"
              >
                Powered by CoinGecko data
              </a>
            </div>
          </div>
          {!singleAssetMatch && (
            <div className="bg-gray-100 mt-10 p-5">
              <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row items-center justify-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-5 w-5 text-gray-400 mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="font-sans font-light text-lg text-gray-400">
                    The ticker symbol "
                    <span className="font-bold">{assetid.toUpperCase()}</span>"
                    also represents other assets
                  </p>
                </div>
                <button
                  className="bg-white px-2 py-1 mx-2 text-gray-400 text-xs font-sans flex flex-row items-center justify-center"
                  onClick={() => {
                    setShowSymbolSharerAssets(!showSymbolSharerAssets);
                  }}
                >
                  {!showSymbolSharerAssets ? "Show" : "Hide"}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className={`h-3 w-3 ml-2 ${
                      showSymbolSharerAssets
                        ? "transform rotate-180 duration-300 transition-all"
                        : ""
                    }`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>
              {showSymbolSharerAssets && (
                <>
                  {assetInfo.map((asset, index) => {
                    if (index !== 0)
                      return (
                        <div className="pt-4">
                          <div className="h-px w-full bg-gray-200 mb-5" />
                          <div className="flex flex-row py-2">
                            <Image
                              src={assetInfo[index].image}
                              height={25}
                              width={25}
                            />
                            <h1 className="font-sans ml-2 font-bold text-lg">
                              {assetInfo[index].name} ({assetid.toUpperCase()})
                            </h1>
                          </div>
                          <h2 className="text-md font-sans font-black">
                            All time high price in USD
                          </h2>
                          <div className="inline-block">
                            <div className="h-1 bg-ath-100 w-full -mb-4 mt-2" />
                            <h3 className="text-2xl md:text-4xl text-black font-sans font-black inline-block mt-4 mb-4">
                              {assetInfo[index].ath.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                              })}
                            </h3>
                          </div>
                          <p className="font-sans font-light text-lg text-gray-400">
                            Set {athTimestamp.fromNow()}
                          </p>
                          <p className="font-sans font-light text-xs text-gray-400">
                            on {moment(athTimestamp).format("MMMM Do, YYYY")}
                          </p>
                          <p className="font-sans font-light text-xs text-gray-400">
                            at {moment(athTimestamp).format("h:mm:ss A UTC")}
                          </p>
                          <div className="bg-white p-3 inline-block mt-4 border border-dotted border-gray-100">
                            <div className="flex flex-row items-center justify-start">
                              <Image src="/cglogo.svg" height={15} width={15} />
                              <a
                                target="_blank"
                                href={`https://www.coingecko.com/en/coins/${asset.id}/usd`}
                                className="font-sans font-light text-xs text-gray-300 leading-none px-2"
                              >
                                Data accurate as of {lastUpdated.fromNow()}
                              </a>
                            </div>
                          </div>
                        </div>
                      );
                  })}
                </>
              )}
            </div>
          )}
        </div>
        <p className="font-sans font-bold mt-20 mb-2 text-gray-400">
          All time highs of other assets
        </p>
        {market.map((asset) => (
          <div className="pt-2">
            <Link href={`/${asset.symbol}`}>
              <a className="font-sans text-gray-400 flex flex-row items-center justify-between">
                <span className="flex flex-row items-center justify-center">
                  <Image src={asset.image} height={15} width={15} />{" "}
                  <span className="pl-2">
                    {asset.name} ({asset.symbol.toUpperCase()})
                  </span>
                </span>
                <span className="flex-grow mx-3 h-px bg-gray-200" />
                <span className="font-bold text-black">
                  {asset.ath.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}{" "}
                  USD
                </span>
              </a>
            </Link>
          </div>
        ))}
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
    </>
  );
};

export async function getStaticPaths() {
  const marketRes = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?order_string=market_cap_desc&vs_currency=usd&per_page=25"
  );
  const market = await marketRes.json();

  const paths = market.map((asset) => ({
    params: { assetid: asset.symbol },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const { assetid } = params;

  const res = await fetch("https://api.coingecko.com/api/v3/coins/list");
  const list = await res.json();

  const asset = list.find((x) => {
    return x.symbol.toLowerCase() === assetid.toLowerCase();
  });

  const matchingAssets = list.filter((x) => {
    return x.symbol.toLowerCase() === assetid.toLowerCase();
  });

  let assetCoingeckoId = "";

  const singleAssetMatch = matchingAssets.length === 1;

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

  const marketRes = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?order_string=market_cap_desc&vs_currency=usd&per_page=100"
  );
  const market = await marketRes.json();

  const assetsResponse = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${assetCoingeckoId}`
  );
  const assetInfo = await assetsResponse.json();

  return {
    props: { asset, assetid, list, assetInfo, market, singleAssetMatch },
    revalidate: 60,
  };
}

export default AssetPage;
