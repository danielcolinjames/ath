import { useState } from "react";
import Link from "next/link";
// import NotFoundPage from "./404.js";
// import Error from "./500.js";
// import Head from "next/head";
import Image from "next/image";
import MetaTags from "../components/MetaTags";
import moment from "moment";
import Layout from "../components/Layout";
import AssetListItem from "../components/AssetListItem";
import { Line } from "react-chartjs-2";
import { fromUnixTime, format, parseISO, differenceInDays } from "date-fns";
import { formatNumber } from "../utils/numbers";
import {
  getAssetColorsFromVibrantObj,
  rgbaStringFromRGBObj,
} from "../utils/colors";
import { getImg } from "./api/vibrant-extraction";

const AssetPage = ({
  asset,
  assetid,
  list,
  assetInfo,
  market,
  singleAssetMatch,
  marketChart,
  palette,
  paletteExtended,
}) => {
  const [showList, setShowList] = useState(false);
  const [showSymbolSharerAssets, setShowSymbolSharerAssets] = useState(false);
  const title = `${assetInfo[0].name} (${assetid.toUpperCase()}) All-Time High`;

  const [r, g, b] = palette.Vibrant.rgb;

  const url = new URL("https://og.ath.ooo");
  url.pathname = `${encodeURIComponent(
    `${assetInfo[0].name}-${assetInfo[0].symbol}-${
      assetInfo[0].ath ? assetInfo[0].ath : "undefined"
    }`
  )}.png`;

  url.searchParams.append("assetName", assetInfo[0].name);
  url.searchParams.append("assetSymbol", assetid.toUpperCase());
  url.searchParams.append("image", assetInfo[0].image);
  url.searchParams.append("r", r);
  url.searchParams.append("g", g);
  url.searchParams.append("b", b);
  url.searchParams.append("ath", formatNumber(assetInfo[0].ath));

  const hasAth = assetInfo[0].ath !== null;

  const ath = hasAth ? formatNumber(assetInfo[0].ath) : "unknown";

  const athTimestamp = moment.utc(assetInfo[0]?.ath_date);
  const lastUpdated = moment.utc(assetInfo[0].last_updated);

  const descriptionText = hasAth
    ? `The all-time high price of ${
        assetInfo[0].name
      } (${assetid.toUpperCase()}) was $${formatNumber(
        assetInfo[0]?.ath
      )}, set on ${moment(athTimestamp).format("MMMM Do, YYYY")} at ${moment(
        athTimestamp
      ).format("h:mm A (UTC)")}`
    : `The all-time high price of ${
        assetInfo[0].name
      } (${assetid.toUpperCase()}) is unknown.`;

  const assetColors =
    palette !== undefined
      ? getAssetColorsFromVibrantObj(palette)
      : {
          vibrant: "#00FFBA",
          darkVibrant: "#00FFBA",
          muted: "#00FFBA",
          darkMuted: "#00FFBA",
          lightMuted: "#00FFBA",
        };

  let assetColorsExtended = [];
  if (!singleAssetMatch) {
    paletteExtended.map((p) => {
      const pf = getAssetColorsFromVibrantObj(p);
      assetColorsExtended.push(pf);
    });
  }

  const data = marketChart?.prices;
  const labels = data?.map((p) => {
    return format(fromUnixTime(p[0] / 1000), "MMMM do, yyyy");
  });
  const prices = data?.map((p) => {
    return p[1];
  });

  const datasets = [
    {
      label: `${assetInfo[0].symbol.toUpperCase()} price`,
      data: prices,
      backgroundColor: rgbaStringFromRGBObj(palette.Vibrant.rgb, 0.085),
      borderColor: assetColors.vibrant,
      borderJoinStyle: "round",
      borderCapStyle: "round",
      borderWidth: 3,
      pointRadius: 0,
      pointHitRadius: 10,
      lineTension: 0.2,
    },
  ];

  const chartData = { labels, datasets };

  const pc = parseFloat(assetInfo[0].ath_change_percentage);

  return (
    <Layout assetColors={assetColors} rgb={[r, g, b]} assetList={list}>
      <MetaTags
        title={title}
        description={descriptionText}
        openGraphImageAbsoluteUrl={url}
        url={`https://ath.ooo/${assetid}`}
        rgb={[r, g, b]}
      />
      <div className="w-full pointer-events-none pt-7 md:pt-14 z-10">
        <div className="max-w-4xl mx-auto">
          <div className="p-5">
            <div className="w-full inline-block px-5 z-10 relative blur-effect bg-[rgba(255,255,255,0.5)] py-3 -ml-5 -mt-20">
              <div className="flex flex-row items-center">
                <Image
                  src={assetInfo[0].image}
                  height={50}
                  width={50}
                  alt={`${assetInfo[0].name} logo`}
                />
                <h1
                  className={`font-ath ml-2.5 md:ml-4 -mt-0.5 font-bold text-xl md:text-2xl text-gray-800`}
                >
                  {assetid.toUpperCase()}{" "}
                  <p className="font-normal text-gray-500 -mt-1 pr-2">
                    {assetInfo[0].name}
                  </p>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      {data?.length > 0 ? (
        <div className="max-h-[30vh]">
          <Line
            data={chartData}
            className="z-10"
            height={600}
            options={{
              hover: { intersect: false },
              legend: {
                position: "bottom",
                align: "center",
                display: false,
              },
              tooltips: {
                intersect: false,
                // mode: "y",
                mode: "index",
                callbacks: {
                  //This removes the tooltip title
                  // title: function () {},
                  label: ({ yLabel }, data) => `$${formatNumber(yLabel)}`,
                },
                //this removes legend color
                displayColors: false,
                yPadding: 15,
                xPadding: 15,
                position: "average",
                pointHitRadius: 20,
                pointRadius: 30,
                caretSize: 10,
                backgroundColor: "rgba(255,255,255,.9)",
                bodyFontSize: 18,
                borderColor: rgbaStringFromRGBObj(palette.Vibrant.rgb, 0.35),
                borderWidth: 2,
                bodyFontFamily: "Satoshi",
                titleFontFamily: "Satoshi",
                titleFontColor: "#000000",
                bodyFontColor: "#303030",
              },
              scales: {
                yAxes: [
                  {
                    ticks: {
                      display: false,
                    },
                    stacked: false,
                    gridLines: {
                      drawTicks: false,
                      color: "rgba(0, 0, 0, 0)",
                      zeroLineColor: "rgba(0, 0, 0, 0)",
                    },
                    drawBorder: false,
                    drawTicks: false,
                  },
                ],
                xAxes: [
                  {
                    padding: 0,
                    backdropPaddingX: 0,
                    backdropPaddingY: 0,
                    ticks: {
                      display: false,
                      padding: 0,
                      mirror: true,
                      backdropPaddingX: 0,
                      backdropPaddingY: 0,
                    },
                    padding: 0,
                    gridLines: {
                      drawTicks: false,
                      color: "rgba(0, 0, 0, 0)",
                      zeroLineColor: "rgba(0, 0, 0, 0)",
                    },
                    drawBorder: false,
                    drawTicks: false,
                  },
                ],
              },
              maintainAspectRatio: false,
            }}
          />
        </div>
      ) : (
        <div className="max-h-[30vh] max-w-4xl mx-auto px-5 py-1">
          <p className="text-xs text-gray-200 font-ath">
            Normally there would be a price chart here, but an error occured
          </p>
        </div>
      )}

      <div
        className="w-full pb-20"
        style={{
          backgroundColor: rgbaStringFromRGBObj(palette.Vibrant.rgb, 0.085),
          borderBottom: `${assetColors.vibrant} 3px solid`,
        }}
      >
        <div className="p-5 pt-2 mx-auto max-w-4xl">
          <div>
            {hasAth ? (
              <>
                <div className="flex items-end justify-between mb-4">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-ath font-black pt-4">
                      All-time high price
                    </h2>
                    <div className="inline-block relative">
                      <div
                        className={`h-2.5 md:h-4 w-full -mb-4 md:-mb-5 mt-2 md:mt-3 duration-500 transition-opacity opacity-100`}
                        style={{
                          backgroundColor: assetColors.vibrant,
                        }}
                      />
                      <h3
                        className={`text-7xl md:text-9xl text-black font-ath font-black inline-block mt-3 pl-4 break-all ${
                          assetInfo[0]?.ath < assetInfo[0].current_price
                            ? "line-through"
                            : ""
                        }`}
                      >
                        <span className="font-bold text-2xl absolute mt-1.5 md:mt-4 -ml-4">
                          $
                        </span>
                        {ath}
                      </h3>
                    </div>
                  </div>
                  <div className={`hidden sm:flex items-end justify-end`}>
                    <div
                      className={`h-full flex-col items-end justify-end text-right`}
                    >
                      <h2 className={`text-sm sm:text-lg font-ath font-bold`}>
                        Current price
                      </h2>
                      <div className="inline-block">
                        <div
                          className={`h-1 sm:h-2.5 w-full duration-500 transition-opacity opacity-100`}
                          style={{
                            backgroundColor: assetColors.vibrant,
                          }}
                        />
                        <div className="">
                          <h3
                            className={`text-3xl text-black font-ath font-black`}
                          >
                            ${formatNumber(assetInfo[0]?.current_price)}
                          </h3>
                          <p
                            className={`text-sm font-ath font-black rounded-full ${
                              pc < -95
                                ? "text-red-900"
                                : pc < -75
                                ? "text-red-800"
                                : pc < -60
                                ? "text-red-700"
                                : pc < -45
                                ? "text-yellow-800"
                                : pc < -30
                                ? "text-yellow-700"
                                : pc < -15
                                ? "text-yellow-600"
                                : pc < -10
                                ? "text-yellow-500"
                                : pc < -5
                                ? "text-gray-500"
                                : pc > 0
                                ? "text-green-500"
                                : "text-gray-400"
                            }`}
                          >
                            {assetInfo[0].ath_change_percentage?.toLocaleString(
                              undefined,
                              {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }
                            )}
                            %
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {assetInfo[0]?.ath < assetInfo[0].current_price ? (
                  <div>
                    <span
                      className={`inline-block bg-yellow-200 border-2 border-yellow-500 rounded-lg mb-10 py-2 px-3 mt-2`}
                    >
                      <span className="">
                        <div className="flex flex-col sm:flex-row items-start justify-start">
                          <span className="mr-1 mt-1">🚀 </span>
                          <p className="pl-0 sm:pl-2 text-black font-ath font-semibold text-lg">
                            Current price (
                            {formatNumber(assetInfo[0].current_price)}) is above
                            previous all-time high price!
                          </p>
                        </div>
                        <p className="text-md text-black font-ath font-light pt-1">
                          Once the {assetInfo[0].name} rocketship takes a
                          breather, the all-time high value coming back from
                          CoinGecko's API will update.
                        </p>
                      </span>
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row items-start justify-between">
                    <div>
                      <p className="font-ath font-light text-2xl md:text-3xl py-1 text-gray-900">
                        Set {athTimestamp.fromNow()}
                      </p>
                      <p className="font-ath font-light text-sm md:text-md text-gray-600">
                        on {moment(athTimestamp).format("MMMM Do, YYYY")} at{" "}
                        {moment(athTimestamp).format("h:mm:ss A UTC")}
                      </p>
                    </div>
                    <a
                      target="_blank"
                      href={`https://www.coingecko.com/en/coins/${assetInfo[0].id}/usd`}
                      className="p-3 inline-block border bg-[rgba(255,255,255,0.6)] rounded-md border-solid border-gray-300 shadow-md border-px mt-4 sm:mt-0 sm:ml-4 coingecko-link transition-all"
                    >
                      <p className="font-ath font-light text-sm text-gray-700 sm:text-right">
                        Data accurate as of {lastUpdated.fromNow()}
                      </p>
                      {/* <div className="h-px bg-gray-300 mt-2" /> */}
                      <div className="flex flex-row items-center justify-start pt-2">
                        <Image
                          src="/cglogo.svg"
                          height={20}
                          width={20}
                          alt={`CoinGecko logo`}
                        />
                        <p className="font-ath font-light text-xs text-gray-600 leading-none px-2 sm:text-right">
                          Powered by CoinGecko
                        </p>
                      </div>
                      {/* Other info about [assetid] */}
                    </a>
                  </div>
                )}
                {/* <div className="pt-5 w-full"></div> */}
                <p className="pt-8 pb-5 text-lg md:text-2xl font-ath font-normal text-black max-w-md md:max-w-xl">
                  {`The highest price ever paid for ${
                    assetInfo[0].name
                  } (${assetid.toUpperCase()}) was ${formatNumber(
                    ath
                  )} USD, set on ${moment(athTimestamp).format(
                    "MMMM Do, YYYY"
                  )}.`}
                </p>
              </>
            ) : (
              <>
                <h2 className="text-3xl font-ath font-black pt-5">
                  No price data found for {assetInfo[0].symbol.toUpperCase()}
                </h2>
                <div className="bg-white p-3 inline-block mt-4 border-solid border-gray-200 border-px">
                  <div className="flex flex-row items-center justify-start">
                    <Image
                      src="/cglogo.svg"
                      height={20}
                      width={20}
                      alt={`CoinGecko logo`}
                    />
                    <a
                      target="_blank"
                      href={`https://www.coingecko.com/en/coins/${asset.id}/usd`}
                      className="font-ath font-light text-xs text-gray-700 leading-none px-2"
                    >
                      Powered by CoinGecko data
                    </a>
                  </div>
                </div>
              </>
            )}

            {hasAth && (
              <div className="block sm:hidden pt-10">
                <div className="h-px bg-gray-200 w-full mb-4" />
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div>
                    <h2 className="text-lg font-ath font-bold text-gray-600">
                      Current price
                    </h2>
                    <div className="inline-block">
                      <h3 className="text-2xl md:text-3xl text-black font-ath font-black inline-block mt-1 mb-4">
                        {formatNumber(assetInfo[0]?.current_price)}
                      </h3>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-lg font-ath font-bold text-gray-600">
                      Change since all-time high
                    </h2>
                    <div className="inline-block">
                      <h3 className="text-2xl md:text-3xl text-black font-ath font-black inline-block mt-1 mb-4">
                        {assetInfo[0].ath_change_percentage?.toLocaleString(
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
            )}

            {!singleAssetMatch && (
              <div className="bg-white border border-px border-solid border-gray-300 mt-10 p-5">
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
                    <p className="font-ath font-light text-lg text-gray-600">
                      The ticker symbol "
                      <span className="font-bold">{assetid.toUpperCase()}</span>
                      " also represents other assets
                    </p>
                  </div>
                  <button
                    className="bg-white px-2 py-1 mx-2 text-gray-800 text-sm font-ath flex flex-row items-center justify-center"
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
                      const athTimestamp = moment.utc(
                        assetInfo[index]?.ath_date
                      );
                      const lastUpdated = moment.utc(
                        assetInfo[index].last_updated
                      );
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
                              <h1 className="font-ath ml-2 font-bold text-lg">
                                {assetInfo[index].name} ({assetid.toUpperCase()}
                                )
                              </h1>
                            </div>
                            <h2 className="text-md font-ath font-black">
                              All-time high price in USD
                            </h2>
                            <div className="inline-block">
                              <div
                                className="h-1 w-full -mb-4 mt-2"
                                style={{
                                  backgroundColor:
                                    assetColorsExtended[index].vibrant,
                                }}
                              />
                              <h3 className="text-2xl md:text-4xl text-black font-ath font-black inline-block mt-4 mb-4">
                                {assetInfo[index].ath.toLocaleString(
                                  undefined,
                                  {
                                    minimumFractionDigits: 2,
                                  }
                                )}
                              </h3>
                            </div>
                            <p className="font-ath font-light text-lg text-gray-600">
                              Set {athTimestamp.fromNow()}
                            </p>
                            <p className="font-ath font-light text-xs text-gray-600">
                              on {moment(athTimestamp).format("MMMM Do, YYYY")}{" "}
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
                                  className="font-ath font-light text-xs text-gray-800 leading-none px-2"
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
        </div>
      </div>
      <div className="w-full bg-white">
        <div className="p-5 mx-auto max-w-4xl">
          <p className="font-ath text-base md:text-xl font-bold mt-20 mb-2 text-gray-400">
            All-time highs of other assets
          </p>
          {market.map((asset, index) => (
            <AssetListItem asset={asset} index={index} showTimeSince />
          ))}
          {/* <button
            className="mt-20 bg-gray-200 p-2 rounded-lg"
            onClick={() => setShowList(!showList)}
          >
            <span className="text-gray-800">
              {showList ? "Hide" : "Show"} all assets{" "}
            </span>
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
          )} */}
        </div>
      </div>
      <style jsx global>{`
        ::-moz-selection {
          color: black !important;
          background: ${rgbaStringFromRGBObj(
            palette.Vibrant.rgb,
            0.85
          )} !important;
        }
        ::selection {
          color: black !important;
          background: ${rgbaStringFromRGBObj(
            palette.Vibrant.rgb,
            0.85
          )} !important;
        }
        #nprogress .bar {
          height: 5px;
          background: ${rgbaStringFromRGBObj(
            palette.Vibrant.rgb,
            1
          )} !important;
        }

        #nprogress .peg {
          box-shadow: 0 0 10px ${rgbaStringFromRGBObj(palette.Vibrant.rgb, 1)},
            0 0 5px ${rgbaStringFromRGBObj(palette.Vibrant.rgb, 1)};
        }
        #nprogress .spinner-icon {
          border-top-color: ${rgbaStringFromRGBObj(palette.Vibrant.rgb, 1)};
          border-left-color: ${rgbaStringFromRGBObj(palette.Vibrant.rgb, 1)};
        }
        .coingecko-link:hover {
          background-color: ${rgbaStringFromRGBObj(palette.Vibrant.rgb, 0.15)};
        }
      `}</style>
    </Layout>
  );
};

export async function getServerSideProps({ params }) {
  const props = {};

  const { assetid } = params;
  props.assetid = assetid;

  const res = await fetch("https://api.coingecko.com/api/v3/coins/list");

  const marketRes = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?order_string=market_cap_desc&vs_currency=usd&per_page=50"
  );

  const list = await res.json();
  props.list = list;

  const marketUnsorted = await marketRes.json();

  const market = marketUnsorted.sort((a, b) => {
    return a.ath_date < b.ath_date ? 1 : b.ath_date < a.ath_date ? -1 : 0;
  });
  props.market = market;

  const asset = list.find((x) => {
    return x.symbol.toLowerCase() === assetid.toLowerCase();
  });

  const matchingAssets = list.filter((x) => {
    return x.symbol.toLowerCase() === assetid.toLowerCase();
  });

  if (matchingAssets.length === 0) {
    return {
      notFound: true,
    };
  } else {
    try {
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

      const athTimestampMoment = moment.utc(assetInfo[0]?.ath_date);
      const daysBetweenNowAndAth = differenceInDays(
        new Date(),
        parseISO(assetInfo[0]?.ath_date)
      );

      const athTimestamp = athTimestampMoment
        .subtract(daysBetweenNowAndAth + 1, "days")
        .format("X");

      const marketChartResponse = await fetch(
        `https://api.coingecko.com/api/v3/coins/${
          assetInfo[0].id
        }/market_chart/range?vs_currency=usd&from=${athTimestamp}&to=${Math.floor(
          Date.now() / 1000
        )}`
      );
      const marketChart = marketChartResponse.ok
        ? await marketChartResponse.json()
        : [];

      let palette;
      if (singleAssetMatch) {
        palette = await getImg(assetInfo[0].image);
      } else {
        palette = await getImg(assetInfo[0].image);
        const paletteExtended = await Promise.all(
          assetInfo.map(async (a, i) => {
            const p = await getImg(a.image);
            return JSON.parse(JSON.stringify(p));
          })
        );
        props.paletteExtended = paletteExtended;
      }

      if (palette.Vibrant === null) palette.Vibrant = { rgb: [125, 125, 125] };
      if (palette.DarkVibrant === null)
        palette.DarkVibrant = { rgb: [125, 125, 125] };
      if (palette.LightVibrant === null)
        palette.LightVibrant = { rgb: [125, 125, 125] };
      if (palette.Muted === null) palette.Muted = { rgb: [125, 125, 125] };
      if (palette.DarkMuted === null)
        palette.DarkMuted = { rgb: [125, 125, 125] };
      if (palette.LightMuted === null)
        palette.LightMuted = { rgb: [125, 125, 125] };

      props.palette = JSON.parse(JSON.stringify(palette));

      props.marketChart = marketChart;
    } catch (e) {
      console.log(e);
      return {
        props: {},
      };
    }
  }

  return {
    props,
  };
}

export default AssetPage;
