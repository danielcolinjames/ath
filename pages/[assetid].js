import { useState, Fragment } from "react";
import Link from "next/link";
import NotFoundPage from "./404.js";
import Error from "./_error.js";
import Image from "next/image";
import MetaTags from "../components/MetaTags";
import moment from "moment";
import Layout from "../components/Layout";

const AssetPage = (props) => {
  const { errorCode, assetid, market, list } = props;
  if (errorCode) {
    if (errorCode === 404) {
      return (
        <NotFoundPage
          market={market}
          list={list}
          assetid={assetid}
          statusCode={404}
        />
      );
    } else {
      return <Error statusCode={statusCode} />;
    }
  } else {
    const { asset, assetid, list, assetInfo, market, singleAssetMatch } = props;

    const [showList, setShowList] = useState(false);
    const [showSymbolSharerAssets, setShowSymbolSharerAssets] = useState(false);
    const title = `${
      assetInfo[0].name
    } (${assetid.toUpperCase()}) All Time High`;

    const url = new URL("https://og.ath.ooo");
    url.pathname = `${encodeURIComponent(
      `${asset.name} (${assetid.toUpperCase()})`
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

    const descriptionText = `The all-time high price of ${
      assetInfo[0].name
    } (${assetid.toUpperCase()}) was ${assetInfo[0].ath.toLocaleString(
      undefined,
      { minimumFractionDigits: 2 }
    )} USD, set ${athTimestamp.fromNow()} on ${moment(athTimestamp).format(
      "MMMM Do, YYYY"
    )} at ${moment(athTimestamp).format("h:mm:ss A UTC")}`;

    return (
      <Layout assetList={list}>
        <div className="p-5 mx-auto max-w-2xl">
          <MetaTags
            title={title}
            description={descriptionText}
            openGraphImageAbsoluteUrl={url}
            url={`https://ath.ooo/${assetid}`}
          />
          <div>
            <div className="flex flex-row py-2">
              <Image
                src={assetInfo[0].image}
                height={28}
                width={28}
                alt={`${assetInfo[0].name} logo`}
              />
              <h1 className="font-sans ml-2 font-bold text-xl">
                {assetInfo[0].name} ({assetid.toUpperCase()})
              </h1>
            </div>
            <h2 className="text-3xl font-sans font-black">
              All time high price
            </h2>
            <div className="inline-block">
              <div className="h-2 md:h-3 bg-ath-100 w-full -mb-4 md:-mb-5 mt-5" />
              <h3 className="text-6xl md:text-8xl text-black font-sans font-black inline-block mt-4 mb-4 pl-4">
                <span className="font-extralight text-xl absolute pt-2 -ml-4">
                  $
                </span>
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
                on {moment(athTimestamp).format("MMMM Do, YYYY")} at{" "}
                {moment(athTimestamp).format("h:mm:ss A UTC")}
              </p>
            </div>
            <p className="pt-5 pb-5 text-md md:text-md font-sans text-gray-500">
              {`The highest price ever paid for ${
                assetInfo[0].name
              } (${assetid.toUpperCase()}) was ${assetInfo[0].ath.toLocaleString(
                undefined,
                { minimumFractionDigits: 2 }
              )} USD, set ${athTimestamp.fromNow()} on ${moment(
                athTimestamp
              ).format("MMMM Do, YYYY")} at ${moment(athTimestamp).format(
                "h:mm A UTC."
              )}`}
            </p>
            <div className="bg-gray-100 p-3 inline-block mt-4">
              <p className="font-sans font-light text-sm text-gray-700">
                Data accurate as of {lastUpdated.fromNow()}
              </p>
              <div className="h-px bg-gray-300 mt-2" />
              <div className="flex flex-row items-center justify-start pt-2">
                <Image
                  src="/cglogo.svg"
                  height={20}
                  width={20}
                  alt={`CoinGecko logo`}
                />
                <a
                  target="_blank"
                  href={`https://www.coingecko.com/en/coins/${asset.id}/usd`}
                  className="font-sans font-light text-xs text-gray-600 leading-none px-2"
                >
                  Powered by CoinGecko data
                </a>
              </div>
              {/* Other info about [assetid] */}
            </div>
            <div className="pt-10">
              <div className="h-px bg-gray-200 w-full mb-4" />
              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* <p>{JSON.stringify(assetInfo[0])}</p> */}
                <div>
                  <h2 className="text-lg font-sans font-bold text-gray-600">
                    Current price in USD
                  </h2>
                  <div className="inline-block">
                    <h3 className="text-2xl md:text-3xl text-black font-sans font-black inline-block mt-1 mb-4">
                      {assetInfo[0].current_price.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })}
                    </h3>
                  </div>
                </div>
                <div>
                  <h2 className="text-lg font-sans font-bold text-gray-600">
                    Change since all time high
                  </h2>
                  <div className="inline-block">
                    <h3 className="text-2xl md:text-3xl text-black font-sans font-black inline-block mt-1 mb-4">
                      {assetInfo[0].ath_change_percentage.toLocaleString(
                        undefined,
                        {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }
                      )}
                      %
                    </h3>
                  </div>
                </div>
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
                      <span className="font-bold">{assetid.toUpperCase()}</span>
                      " also represents other assets
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
                          <div className="pt-4" key={`shared-${index}`}>
                            <div className="h-px w-full bg-gray-200 mb-5" />
                            <div className="flex flex-row py-2">
                              <Image
                                src={assetInfo[index].image}
                                height={25}
                                width={25}
                                alt={`${assetInfo[index].name} logo`}
                              />
                              <h1 className="font-sans ml-2 font-bold text-lg">
                                {assetInfo[index].name} ({assetid.toUpperCase()}
                                )
                              </h1>
                            </div>
                            <h2 className="text-md font-sans font-black">
                              All time high price in USD
                            </h2>
                            <div className="inline-block">
                              <div className="h-1 bg-ath-100 w-full -mb-4 mt-2" />
                              <h3 className="text-2xl md:text-4xl text-black font-sans font-black inline-block mt-4 mb-4">
                                {assetInfo[index].ath.toLocaleString(
                                  undefined,
                                  {
                                    minimumFractionDigits: 2,
                                  }
                                )}
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
                                <Image
                                  src="/cglogo.svg"
                                  height={15}
                                  width={15}
                                  alt={`CoinGecko logo`}
                                />
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
          <p className="font-sans text-base md:text-xl font-bold mt-20 mb-2 text-gray-400">
            All time highs of other assets
          </p>
          {market.map((asset, index) => (
            <Link href={`/${asset.symbol}`} key={`${asset.id}-${index}`}>
              <a
                className={`py-5 ${
                  index !== 0 ? "border-t" : ""
                } border-gray-200 font-sans text-lg md:text-lg text-gray-700 font-semibold flex flex-col md:flex-row items-start md:items-center md:justify-between`}
              >
                <span className="flex flex-row items-center justify-center">
                  <Image
                    src={asset.image}
                    height={20}
                    width={20}
                    alt={`${asset.name} logo`}
                  />{" "}
                  <span className="pl-2 font-bold">
                    {asset.symbol.toUpperCase()}
                    <span className="pl-2 text-gray-400 font-medium">
                      {asset.name}
                    </span>
                  </span>
                </span>
                {/* <span className="flex-grow mx-3 h-px bg-gray-200" /> */}
                <span className="font-bold text-black">
                  {asset.ath.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}{" "}
                  USD
                </span>
              </a>
            </Link>
          ))}
          <button
            className="mt-20 bg-gray-200 p-2 rounded-lg"
            onClick={() => setShowList(!showList)}
          >
            {showList ? "Hide" : "Show"} more assets{" "}
          </button>
          {showList && (
            <ul className="text-gray-400">
              {list.map((asset, index) => (
                <li
                  className="list-disc ml-8 pt-2"
                  key={`${asset.symbol}-${index}`}
                >
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
  }
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
  const props = {};

  const { assetid } = params;
  props.assetid = assetid;

  const res = await fetch("https://api.coingecko.com/api/v3/coins/list");

  const marketRes = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?order_string=market_cap_desc&vs_currency=usd&per_page=100"
  );
  let errorCode = !res.ok
    ? res.statusCode
    : !marketRes.ok
    ? marketRes.statusCode
    : false;

  if (errorCode) {
    props.errorCode = errorCode;
  } else {
    const list = await res.json();
    props.list = list;

    const market = await marketRes.json();
    props.market = market;

    const asset = list.find((x) => {
      return x.symbol.toLowerCase() === assetid.toLowerCase();
    });

    const matchingAssets = list.filter((x) => {
      return x.symbol.toLowerCase() === assetid.toLowerCase();
    });

    if (matchingAssets.length === 0) {
      props.errorCode = 404;
    } else {
      props.asset = asset;

      const singleAssetMatch = matchingAssets.length === 1;
      props.singleAssetMatch = singleAssetMatch;

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
      props.assetInfo = assetInfo;
    }
  }

  return {
    props,
    revalidate: 60,
  };
}

export default AssetPage;
