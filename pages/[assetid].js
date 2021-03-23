import { useState } from "react";
import Link from "next/link";
import NotFoundPage from "./404.js";
import Error from "./_error.js";
import Image from "next/image";
import MetaTags from "../components/MetaTags";
import moment from "moment";
import Layout from "../components/Layout";
import AssetListItem from "../components/AssetListItem";
import { usePalette } from "react-palette";
import { Line } from "react-chartjs-2";
import { fromUnixTime, format, parseISO, differenceInDays } from "date-fns";
import { formatNumber } from "../utils/numbers";

import hexToRgba from "hex-to-rgba";

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
    const {
      asset,
      assetid,
      list,
      assetInfo,
      market,
      singleAssetMatch,
      marketChart,
    } = props;
    const [showList, setShowList] = useState(false);
    const [showSymbolSharerAssets, setShowSymbolSharerAssets] = useState(false);
    const title = `${
      assetInfo[0].name
    } (${assetid.toUpperCase()}) All-Time High`;

    const url = new URL("https://og.ath.ooo");
    url.pathname = `${encodeURIComponent(
      `${assetInfo[0].name}-${assetInfo[0].ath}`
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
        } (${assetid.toUpperCase()}) was ${assetInfo[0]?.ath?.toLocaleString(
          undefined,
          { minimumFractionDigits: 2 }
        )} USD, set on ${moment(athTimestamp).format(
          "MMMM Do, YYYY"
        )} at ${moment(athTimestamp).format("h:mm:ss A UTC")}`
      : `The all-time high price of ${
          assetInfo[0].name
        } (${assetid.toUpperCase()}) is unknown.`;

    const {
      data: assetColors,
      loading: assetColorsLoading,
      error: assetColorsError,
    } = usePalette(`https://cors.ath.ooo/${assetInfo[0].image}`);

    const data = marketChart.prices;
    const labels = data.map((p) => {
      return format(fromUnixTime(p[0] / 1000), "MMMM do, yyyy");
    });
    const prices = data.map((p) => {
      return p[1];
    });

    const datasets = [
      {
        label: `${assetInfo[0].symbol.toUpperCase()} price`,
        data: prices,
        backgroundColor: assetColorsLoading
          ? "transparent"
          : hexToRgba(assetColors.vibrant, 0.085),
        borderColor:
          assetColorsLoading && !assetColorsError
            ? "transparent"
            : assetColors.vibrant,
        borderJoinStyle: "round",
        borderCapStyle: "round",
        borderWidth: 3,
        pointRadius: 0,
        pointHitRadius: 10,
        lineTension: 0.2,
      },
    ];

    const chartData = { labels, datasets };

    return (
      <Layout
        assetColors={assetColors}
        assetColorsLoading={assetColorsLoading}
        assetColorsError={assetColorsError}
        assetList={list}
      >
        <MetaTags
          title={title}
          description={descriptionText}
          openGraphImageAbsoluteUrl={url}
          url={`https://ath.ooo/${assetid}`}
        />
        <div className="w-full pointer-events-none pt-14 z-10">
          <div className="max-w-2xl mx-auto">
            <div className="p-5 mx-autoz zmax-w-2xl">
              <div className="rounded-full shadow-xlz inline-block px-5 pr-10 z-10 relative blur-effect bg-[rgba(255,255,255,0.5)] py-3 -ml-5 -mt-20">
                <div className="flex flex-row items-center">
                  <Image
                    src={assetInfo[0].image}
                    height={60}
                    width={60}
                    alt={`${assetInfo[0].name} logo`}
                  />
                  <h1
                    className={`font-sans ml-4 font-bold text-2xl text-gray-800`}
                  >
                    {assetid.toUpperCase()}{" "}
                    <p className="font-bold text-gray-500 pr-2">
                      {assetInfo[0].name}
                    </p>
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
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
                position: "nearest",
                pointHitRadius: 20,
                caretSize: 10,
                backgroundColor: "rgba(255,255,255,.9)",
                bodyFontSize: 18,
                borderColor: assetColorsLoading
                  ? "transparent"
                  : hexToRgba(assetColors.vibrant, 0.35),
                borderWidth: 2,
                bodyFontFamily: "Inter",
                titleFontFamily: "Inter",
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
        <div
          className="w-full"
          style={{
            backgroundColor: assetColorsLoading
              ? "transparent"
              : hexToRgba(assetColors.vibrant, 0.085),
          }}
        >
          <div className="p-5 mx-auto max-w-2xl">
            <div>
              {hasAth ? (
                <>
                  <h2 className="text-3xl font-sans font-black pt-3">
                    All-time high price
                  </h2>
                  <div className="inline-block">
                    <div
                      className={`h-2 md:h-3 zbg-ath-100 w-full -mb-4 md:-mb-5 mt-5 duration-500 transition-opacity ${
                        assetColorsLoading && !assetColorsError
                          ? "opacity-0"
                          : "opacity-100"
                      }`}
                      style={
                        assetColorsLoading || assetColorsError
                          ? { backgroundColor: "white" }
                          : { backgroundColor: assetColors.vibrant }
                      }
                    />
                    <h3
                      className={`text-6xl md:text-8xl text-black font-sans font-black inline-block mt-4 mb-4 pl-4`}
                    >
                      <span className="font-extralight text-xl absolute pt-2 -ml-4">
                        $
                      </span>
                      {ath}
                    </h3>
                  </div>
                  {assetInfo[0]?.ath < assetInfo[0].current_price && (
                    <div>
                      <span
                        className={`inline-block bg-yellow-100 rounded-lg mb-10 py-2 px-3`}
                      >
                        <span className="flex flex-row items-center justify-start">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="h-5 w-auto text-yellow-500"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                          </svg>
                          <p className="text-sm pl-2 font-light text-black">
                            Current price (
                            {assetInfo[0].current_price.toLocaleString(
                              undefined,
                              { minimumFractionDigits: 2 }
                            )}
                            ) is equal to or above all-time high price
                          </p>
                        </span>
                      </span>
                    </div>
                  )}
                  <div>
                    <p className="font-sans font-light text-2xl text-gray-400">
                      Set {athTimestamp.fromNow()}
                    </p>
                    <p className="font-sans font-light text-xs text-gray-400">
                      on {moment(athTimestamp).format("MMMM Do, YYYY")} at{" "}
                      {moment(athTimestamp).format("h:mm:ss A UTC")}
                    </p>
                  </div>
                  <div className="pt-10 w-full"></div>
                  <p className="pt-8 pb-5 text-xl md:text-2xl font-sans font-semibold text-black max-w-sm md:max-w-md">
                    {`The highest price ever paid for ${
                      assetInfo[0].name
                    } (${assetid.toUpperCase()}) was ${ath} USD, set on ${moment(
                      athTimestamp
                    ).format("MMMM Do, YYYY")} at ${moment(athTimestamp).format(
                      "h:mm A UTC."
                    )}`}
                  </p>
                  <a
                    target="_blank"
                    href={`https://www.coingecko.com/en/coins/${assetInfo[0].id}/usd`}
                    className="bg-gray-100 p-3 inline-block mt-4"
                  >
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
                      <p className="font-sans font-light text-xs text-gray-600 leading-none px-2">
                        Powered by CoinGecko data
                      </p>
                    </div>
                    {/* Other info about [assetid] */}
                  </a>
                </>
              ) : (
                <>
                  <h2 className="text-3xl font-sans font-black pt-5">
                    No price data found for {assetInfo[0].symbol.toUpperCase()}
                  </h2>
                  <div className="bg-gray-100 p-3 inline-block mt-4">
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
                        className="font-sans font-light text-xs text-gray-600 leading-none px-2"
                      >
                        Powered by CoinGecko data
                      </a>
                    </div>
                  </div>
                </>
              )}

              {hasAth && (
                <div className="pt-10">
                  <div className="h-px bg-gray-200 w-full mb-4" />
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    <div>
                      <h2 className="text-lg font-sans font-bold text-gray-600">
                        Current price in USD
                      </h2>
                      <div className="inline-block">
                        <h3 className="text-2xl md:text-3xl text-black font-sans font-black inline-block mt-1 mb-4">
                          {assetInfo[0].current_price?.toLocaleString(
                            undefined,
                            {
                              minimumFractionDigits: 2,
                            }
                          )}
                        </h3>
                      </div>
                    </div>
                    <div>
                      <h2 className="text-lg font-sans font-bold text-gray-600">
                        Change since all-time high
                      </h2>
                      <div className="inline-block">
                        <h3 className="text-2xl md:text-3xl text-black font-sans font-black inline-block mt-1 mb-4">
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
                      <p className="font-sans font-light text-lg text-gray-600">
                        The ticker symbol "
                        <span className="font-bold">
                          {assetid.toUpperCase()}
                        </span>
                        " also represents other assets
                      </p>
                    </div>
                    <button
                      className="bg-white px-2 py-1 mx-2 text-gray-800 text-sm font-sans flex flex-row items-center justify-center"
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
                                  {assetInfo[index].name} (
                                  {assetid.toUpperCase()})
                                </h1>
                              </div>
                              <h2 className="text-md font-sans font-black">
                                All-time high price in USD
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
                              <p className="font-sans font-light text-lg text-gray-600">
                                Set {athTimestamp.fromNow()}
                              </p>
                              <p className="font-sans font-light text-xs text-gray-600">
                                on{" "}
                                {moment(athTimestamp).format("MMMM Do, YYYY")}{" "}
                                at{" "}
                                {moment(athTimestamp).format("h:mm:ss A UTC")}
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
                                    className="font-sans font-light text-xs text-gray-800 leading-none px-2"
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
              All-time highs of other assets
            </p>
            {market.map((asset, index) => (
              <AssetListItem asset={asset} index={index} showTimeSince />
            ))}
            <button
              className="mt-20 bg-gray-200 p-2 rounded-lg"
              onClick={() => setShowList(!showList)}
            >
              <span className="text-gray-800">
                {showList ? "Hide" : "Show"} more assets{" "}
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
            )}
          </div>
        </div>
        <style jsx global>{`
          ::-moz-selection {
            color: white !important;
            background: ${assetColorsLoading
              ? "#00FFBA"
              : assetColors.darkMuted} !important;
          }
          ::selection {
            color: white !important;
            background: ${assetColorsLoading
              ? "#00FFBA"
              : assetColors.darkMuted} !important;
          }
          #nprogress .bar {
            height: 5px;
            background: ${assetColorsLoading
              ? "#00FFBA"
              : assetColors.vibrant} !important;
          }
          #nprogress .peg {
            box-shadow: 0 0 10px
                ${assetColorsLoading && !assetColorsError
                  ? "#00FFBA"
                  : assetColors.vibrant},
              0 0 5px
                ${assetColorsLoading && !assetColorsError
                  ? "#00FFBA"
                  : assetColors.vibrant};
          }
          #nprogress .spinner-icon {
            border-top-color: ${assetColorsLoading
              ? "#00FFBA"
              : assetColors.vibrant};
            border-left-color: ${assetColorsLoading
              ? "#00FFBA"
              : assetColors.vibrant};
          }
        `}</style>
      </Layout>
    );
  }
};

export async function getServerSideProps({ params }) {
  const props = {};

  const { assetid } = params;
  props.assetid = assetid;

  const res = await fetch("https://api.coingecko.com/api/v3/coins/list");

  const marketRes = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?order_string=market_cap_desc&vs_currency=usd&per_page=25"
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

      const athTimestampMoment = moment.utc(assetInfo[0]?.ath_date);
      const daysBetweenNowAndAth = differenceInDays(
        new Date(),
        parseISO(assetInfo[0]?.ath_date)
      );

      const athTimestamp = athTimestampMoment
        .subtract(daysBetweenNowAndAth + 1, "days")
        .format("X");
      // TODO: set the above "7 days" to some logical thing like: if the distance between now and ATH Date > 30 days, set it to 7 days, if now - ATH > 7 days, set to 1 day, if < 1 day, set to 4 hours

      const marketChartResponse = await fetch(
        `https://api.coingecko.com/api/v3/coins/${
          assetInfo[0].id
        }/market_chart/range?vs_currency=usd&from=${athTimestamp}&to=${Math.floor(
          Date.now() / 1000
        )}`
      );

      const marketChart = await marketChartResponse.json();

      props.marketChart = marketChart;
    }
  }

  return {
    props,
  };
}

export default AssetPage;
