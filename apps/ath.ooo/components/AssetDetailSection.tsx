import TimeAgo from "@repo/ath.ooo/components/TimeAgo";
import {
  getPercentChangeColorClassName,
  rgbaStringFromRGBObj,
} from "@repo/utils/colors";
import { formatNumber } from "@repo/utils/numbers";
import classNames from "classnames";
import { parseISO } from "date-fns";
// import { formatInTimeZone } from '@repo/utils/timestamps'
import Image from "next/image";

export const AssetDetailSection = ({
  hasAth,
  ath,
  athDate,
  athTimestamp,
  athTimestampFormatted,
  assetData,
  assetid,
  palette,
  assetColors,
}: {
  hasAth: boolean;
  ath: string;
  athDate: string;
  athTimestamp: Date | null;
  athTimestampFormatted: string;
  assetid: string;
  assetData: any;
  palette: any;
  assetColors: any;
}) => {
  const percentChange = parseFloat(assetData.ath_change_percentage);
  const percentChangeColor = getPercentChangeColorClassName(percentChange);

  const lastUpdated = parseISO(assetData.last_updated);

  return (
    <>
      <div
        className="w-full pb-2 md:pb-4"
        style={{
          backgroundColor: rgbaStringFromRGBObj(palette.Vibrant.rgb, 0.085),
        }}
      >
        <div className="p-5 pt-2 mx-auto max-w-4xl">
          <div>
            {hasAth ? (
              <>
                <div className="flex items-end justify-between mb-1 md:mb-4">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-ath font-black pt-4">
                      All-time high price
                    </h2>
                    <div className="inline-block relative">
                      <div
                        className="h-2.5 md:h-4 w-full -mb-4 md:-mb-5 mt-2 md:mt-3 duration-500 transition-opacity opacity-100"
                        style={{
                          backgroundColor: assetColors.vibrant,
                        }}
                      />
                      <h3
                        className={`${
                          ath.length > 6
                            ? "text-5xl md:text-7xl pt-1"
                            : "text-7xl md:text-9xl"
                        } text-black font-ath font-black inline-block mt-3 pl-4 break-all ${
                          assetData?.ath < assetData.current_price
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
                  {/* Current price, hidden on mobile, shown on desktop */}
                  <div className="hidden sm:flex items-end justify-end">
                    <div className="h-full flex-col items-end justify-end text-right">
                      <h2 className="text-sm sm:text-lg font-ath font-bold">
                        Current price
                      </h2>
                      <div className="inline-block">
                        <div
                          className="h-1 sm:h-2.5 w-full duration-500 transition-opacity opacity-100"
                          style={{
                            backgroundColor: assetColors.vibrant,
                          }}
                        />
                        <div className="">
                          <h3 className="text-3xl text-black font-ath font-black">
                            ${formatNumber(assetData?.current_price)}
                          </h3>
                          <p
                            className={classNames(
                              "text-sm font-ath font-black rounded-full",
                              percentChangeColor,
                            )}
                          >
                            {percentChange?.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                            %
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {assetData?.ath < assetData.current_price ? (
                  <div>
                    {/* Current price shown DURING new ATH on mobile, hidden on desktop */}
                    <div className="h-full flex sm:hidden flex-col items-end justify-end text-right">
                      <h2 className="text-sm sm:text-lg font-ath font-bold">
                        Current price
                      </h2>
                      <div className="inline-block">
                        <div
                          className="h-1 sm:h-2.5 w-full duration-500 transition-opacity opacity-100"
                          style={{
                            backgroundColor: assetColors.vibrant,
                          }}
                        />
                        <div className="">
                          <h3 className="text-3xl text-black font-ath font-black">
                            ${formatNumber(assetData?.current_price)}
                          </h3>
                          <p
                            className={classNames(
                              "text-sm font-ath font-black rounded-full",
                              percentChangeColor,
                            )}
                          >
                            {assetData.ath_change_percentage?.toLocaleString(
                              undefined,
                              {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              },
                            )}
                            %
                          </p>
                        </div>
                      </div>
                    </div>
                    <span className="inline-block bg-yellow-200 border-2 border-yellow-500 rounded-lg mb-10 py-2 px-3 mt-2">
                      <span className="">
                        <div className="flex flex-col sm:flex-row items-start justify-start">
                          <span className="mr-1 mt-1">🚀 </span>
                          <p className="pl-0 sm:pl-2 text-black font-ath font-semibold text-lg">
                            Current price (
                            {formatNumber(assetData.current_price)}) is above
                            previous all-time high price!
                          </p>
                        </div>
                        <p className="text-md text-black font-ath font-light pt-1">
                          Once the {assetData.name} rocketship takes a breather,
                          the all-time high value will update.
                        </p>
                      </span>
                    </span>
                    <a
                      className="p-3 inline-block sm:hidden border bg-[rgba(255,255,255,0.6)] rounded-md border-solid border-gray-300 shadow-sm border-px coingecko-link transition-all"
                      href={`https://www.coingecko.com/en/coins/${assetData.id}/usd`}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <p className="font-ath font-light text-sm text-gray-700 sm:text-right">
                        Data accurate as of <TimeAgo date={lastUpdated} />
                      </p>
                      <div className="flex flex-row items-center justify-start pt-2">
                        <Image
                          alt="CoinGecko logo"
                          height={20}
                          src="/cglogo.svg"
                          width={20}
                        />
                        <p className="font-ath font-light text-xs text-gray-600 leading-none px-2 sm:text-right">
                          Powered by CoinGecko
                        </p>
                      </div>
                    </a>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row items-start justify-between">
                    <div>
                      <p className="font-ath font-light text-2xl md:text-3xl py-1 text-gray-900">
                        Set <TimeAgo date={athTimestamp} />
                      </p>
                      <p className="font-ath font-light text-sm md:text-md text-gray-600">
                        on {athDate} at {athTimestampFormatted} UTC
                      </p>
                    </div>
                    <div
                      className="h-px w-full mt-4 mb-4 block sm:hidden"
                      style={{
                        backgroundColor: rgbaStringFromRGBObj(
                          palette.Vibrant.rgb,
                          0.25,
                        ),
                      }}
                    />
                    {/* Current price (hidden on desktop, shown on mobile) */}
                    <div className="flex sm:hidden flex-col justify-between w-full">
                      <div className="text-right">
                        <h2 className="text-sm sm:text-lg font-ath font-bold">
                          Current price
                        </h2>
                        <div className="inline-block">
                          <div
                            className="h-2 sm:h-2.5 w-full duration-500 transition-opacity opacity-100"
                            style={{
                              backgroundColor: assetColors.vibrant,
                            }}
                          />
                          <div className="">
                            <h3 className="text-5xl text-black font-ath font-black">
                              ${formatNumber(assetData?.current_price)}
                            </h3>
                            <p
                              className={classNames(
                                "text-md font-ath font-black rounded-full mb-4",
                                percentChangeColor,
                              )}
                            >
                              {assetData.ath_change_percentage?.toLocaleString(
                                undefined,
                                {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                },
                              )}
                              %
                            </p>
                          </div>
                        </div>
                      </div>
                      <a
                        className="p-3 inline-block border bg-[rgba(255,255,255,0.6)] rounded-md border-solid border-gray-300 shadow-sm border-px mt-0 sm:ml-4 coingecko-link transition-all"
                        href={`https://www.coingecko.com/en/coins/${assetData.id}/usd`}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <p className="font-ath font-light text-sm text-gray-700 sm:text-right">
                          Data accurate as of <TimeAgo date={lastUpdated} />
                        </p>
                        <div className="flex flex-row items-center justify-start pt-2">
                          <Image
                            alt="CoinGecko logo"
                            height={20}
                            src="/cglogo.svg"
                            width={20}
                          />
                          <p className="font-ath font-light text-xs text-gray-600 leading-none px-2 sm:text-right">
                            Powered by CoinGecko
                          </p>
                        </div>
                      </a>
                    </div>
                  </div>
                )}
                <a
                  className="hidden max-w-xl mt-4 sm:flex p-3 border bg-[rgba(255,255,255,0.6)] rounded-md border-solid border-gray-300 shadow-sm border-px coingecko-link transition-all flex-row justify-between items-center px-4"
                  href={`https://www.coingecko.com/en/coins/${assetData.id}/usd`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <p className="font-ath font-light text-sm text-gray-700 sm:text-right">
                    Data accurate as of <TimeAgo date={lastUpdated} />
                  </p>
                  <div className="flex flex-row items-center justify-start">
                    <Image
                      alt="CoinGecko logo"
                      height={20}
                      src="/cglogo.svg"
                      width={20}
                    />
                    <p className="font-ath font-light text-xs text-gray-600 leading-none pl-2 sm:text-right">
                      Powered by CoinGecko
                    </p>
                  </div>
                </a>
                <p className="pt-8 pb-5 text-lg md:text-2xl font-ath font-normal text-black max-w-md md:max-w-xl">
                  {`The all-time highest price ever paid for ${assetData.name} was ${ath} USD. This ATH price was set on ${athDate}.`}
                </p>
              </>
            ) : (
              <>
                <h2 className="text-3xl font-ath font-black pt-5">
                  No price data found for {assetData.symbol.toUpperCase()}
                </h2>
                <div className="bg-white p-3 inline-block mt-4 border-solid border-gray-200 border-px">
                  <div className="flex flex-row items-center justify-start">
                    <Image
                      alt="CoinGecko logo"
                      height={20}
                      src="/cglogo.svg"
                      width={20}
                    />
                    <a
                      className="font-ath font-light text-xs text-gray-700 leading-none px-2"
                      href={`https://www.coingecko.com/en/coins/${assetid}/usd`}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      Powered by CoinGecko data
                    </a>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
