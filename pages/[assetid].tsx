import { useState, useEffect } from 'react'
import Image from 'next/image'
import MetaTags from '../components/MetaTags'
import { Layout } from '../components/Layout'
import AssetListItem from '../components/AssetListItem'
import { fromUnixTime, format, parseISO, differenceInDays, getUnixTime, sub } from 'date-fns'
import { formatNumber } from '../utils/numbers'
import {
  getAssetColorsFromVibrantObj,
  getPercentChangeColorClassName,
  rgbaStringFromRGBObj,
  rgbToHex,
  shouldBeWhiteText,
} from '../utils/colors'
import { getImg } from './api/vibes'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import parse from 'html-react-parser'
import cache from '../utils/cache'
import { formatInTimeZone } from '../utils/timestamps'
import TimeAgo from '../components/TimeAgo'
import { fetchList } from '../utils/coingecko'
import AssetChart from '../components/AssetChart'
import LinksSection from '../components/LinksSection'
import { getAssetData } from 'utils/common'
import { AssetChartHeader } from 'components/AssetChartHeader'
import classNames from 'classnames'

const AssetPage = ({
  asset,
  assetid,
  assetInfoExtended,
  list,
  assetInfo,
  singleAssetMatch,
  palette,
  paletteExtended,
}: {
  asset: any
  assetid: string
  assetInfoExtended: any
  list: any[]
  assetInfo: any
  singleAssetMatch: boolean
  palette: any
  paletteExtended: any
}) => {
  const [showSymbolSharerAssets, setShowSymbolSharerAssets] = useState(false)

  const assetData = getAssetData(assetInfo)
  const hasAth = !!assetData

  const rank = assetData?.market_cap_rank

  const ath = hasAth ? formatNumber(assetData.ath) : 'unknown'

  const title = `${assetData.name} (${assetid.toUpperCase()}) ATH: $${ath} | ath.ooo`

  const [r, g, b] = palette.Vibrant.rgb

  const url = new URL('https://ath.ooo/api/og')
  // url.pathname = `${encodeURIComponent(`${assetData.symbol}`)}.png`;

  // name
  url.searchParams.append('n', assetData.name)
  // ticker
  url.searchParams.append('t', assetid.toUpperCase())
  // image
  url.searchParams.append('i', assetData.image)
  // r
  url.searchParams.append('r', r)
  // g
  url.searchParams.append('g', g)
  // b
  url.searchParams.append('b', b)
  const white = shouldBeWhiteText(rgbToHex(r, g, b))
  // 1 if white text passes contrast, 0 if not
  url.searchParams.append('w', white ? '1' : '0')

  // console.log(
  //   `http://localhost:3001${url.pathname}${decodeURIComponent(url.search)}`
  // );

  const hasValidDate = assetData.ath_date !== null

  const athTimestamp = hasValidDate ? parseISO(assetData?.ath_date) : null
  const athTimestampFormatted = hasValidDate
    ? formatInTimeZone(athTimestamp, 'h:mm:ss a', 'UTC')
    : 'an unknown date'
  const lastUpdated = parseISO(assetData.last_updated)

  const athDate = hasValidDate ? format(athTimestamp as Date, 'MMMM do, yyyy') : 'an unknown date'

  const descriptionText = hasAth
    ? `The all-time high price of ${assetData.name} (${assetid.toUpperCase()}) was $${formatNumber(
        assetData?.ath
      )}, set on ${athDate} at ${athTimestampFormatted} (UTC)`
    : `The all-time high price of ${assetData.name} (${assetid.toUpperCase()}) is unknown.`

  const assetColors =
    palette !== undefined
      ? getAssetColorsFromVibrantObj(palette)
      : {
          vibrant: '#00FFBA',
          darkVibrant: '#00FFBA',
          muted: '#00FFBA',
          darkMuted: '#00FFBA',
          lightMuted: '#00FFBA',
        }

  let assetColorsExtended: any = []
  if (!singleAssetMatch) {
    paletteExtended.map((p: any) => {
      const pf = getAssetColorsFromVibrantObj(p)
      assetColorsExtended.push(pf)
    })
  }

  const [marketChartLoading, setMarketChartLoading] = useState<boolean>(true)
  const [marketChart, setMarketChart] = useState<any>([])

  useEffect(() => {
    const fetchMarketChart = async () => {
      setMarketChartLoading(true)
      const athDate = parseISO(assetData?.ath_date)

      const daysBetweenNowAndAth = differenceInDays(new Date(), athDate)

      const athTimestamp = getUnixTime(sub(athDate, { days: daysBetweenNowAndAth + 3 }))

      const marketChartResponse = await fetch(
        `https://api.coingecko.com/api/v3/coins/${
          assetData.id
        }/market_chart/range?vs_currency=usd&from=${athTimestamp}&to=${Math.floor(
          Date.now() / 1000
        )}`
      )
      const marketChartData = marketChartResponse.ok ? await marketChartResponse.json() : []

      setMarketChart(marketChartData)
      setMarketChartLoading(false)
    }

    try {
      fetchMarketChart()
    } catch (e) {
      setMarketChart([])
      setMarketChartLoading(false)
      // eslint-disable-next-line no-console
      console.error(e)
    }
  }, [assetData?.ath_date, assetData.id, assetInfo])

  const data = marketChartLoading ? [0, 0] : marketChart?.prices
  const labels = marketChartLoading
    ? ['', '']
    : data?.map((p: any) => {
        return format(fromUnixTime(p[0] / 1000), 'MMMM do, yyyy')
      })
  const prices = data?.map((p: any) => {
    return p[1]
  })

  const datasets = [
    {
      label: `${assetData.symbol.toUpperCase()} price`,
      data: prices,
      fill: true,
      backgroundColor: rgbaStringFromRGBObj(palette.Vibrant.rgb, 0.085),
      borderColor: assetColors.vibrant,
      borderJoinStyle: 'round',
      borderCapStyle: 'round',
      borderWidth: 3,
      pointRadius: 0,
      pointHitRadius: 10,
      lineTension: 0.2,
    },
  ]

  const chartData = { labels, datasets }

  const pc = parseFloat(assetData.ath_change_percentage)

  const [market, setMarket] = useState<any>([])
  const [marketLoading, setMarketLoading] = useState<boolean>(false)

  useEffect(() => {
    const getMarketData = async () => {
      setMarketLoading(true)
      const marketRes = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?order_string=market_cap_desc&vs_currency=usd&per_page=250'
      )
      const marketUnsorted = await marketRes.json()
      const market = marketUnsorted.sort((a: any, b: any) => {
        return a.ath_date < b.ath_date ? 1 : b.ath_date < a.ath_date ? -1 : 0
      })
      setMarket(market)
      setMarketLoading(false)
    }
    try {
      getMarketData()
    } catch (e) {
      setMarket([])
      setMarketLoading(false)
      // eslint-disable-next-line no-console
      console.error(e)
    }
  }, [])

  const descArray = assetInfoExtended.description.en.split('\n')
  let charCount = 0
  const descArrayAsHtml = descArray
    .map((p: any) => {
      charCount += p.length
      const pWithA = p.replace('a href=', "a class='desc-a' href=")
      return `<p class='desc-p'>${pWithA}</p>`
    })
    .join('')

  const descIsEmpty =
    descArray.findIndex((p: any) => {
      return p.length === 0
    }) !== -1

  // const [showDescriptionExpandOption, setShowDescriptionExpandOption] =
  // useState(charCount > 500)
  const [descriptionIsExpanded, setDescriptionIsExpanded] = useState(false)

  return (
    <Layout assetColors={assetColors} assetList={list} rgb={[r, g, b]}>
      <MetaTags
        description={descriptionText}
        openGraphImageAbsoluteUrl={url.toString()}
        rgb={[r, g, b]}
        title={title}
        url={`https://ath.ooo/${assetid}`}
      />
      <AssetChartHeader assetData={assetData} assetid={assetid} palette={palette} rank={rank} />
      {data?.length > 0 ? (
        <AssetChart
          className="z-10"
          data={chartData}
          palette={palette}
          wrapperClassName="max-h-[30vh]"
        />
      ) : (
        <div className="max-h-[30vh] max-w-4xl mx-auto px-5 py-1" style={{ height: 600 }}>
          <p className="text-xs text-gray-200 font-ath">
            Normally there would be a price chart here, but an error occured
          </p>
        </div>
      )}
      <div
        className="w-full pb-2 md:pb-4"
        style={{
          backgroundColor: rgbaStringFromRGBObj(palette.Vibrant.rgb, 0.085),
        }}>
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
                          ath.length > 6 ? 'text-5xl md:text-7xl pt-1' : 'text-7xl md:text-9xl'
                        } text-black font-ath font-black inline-block mt-3 pl-4 break-all ${
                          assetData?.ath < assetData.current_price ? 'line-through' : ''
                        }`}>
                        <span className="font-bold text-2xl absolute mt-1.5 md:mt-4 -ml-4">$</span>
                        {ath}
                      </h3>
                    </div>
                  </div>
                  {/* Current price, hidden on mobile, shown on desktop */}
                  <div className="hidden sm:flex items-end justify-end">
                    <div className="h-full flex-col items-end justify-end text-right">
                      <h2 className="text-sm sm:text-lg font-ath font-bold">Current price</h2>
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
                              'text-sm font-ath font-black rounded-full',
                              getPercentChangeColorClassName(pc)
                            )}>
                            {assetData.ath_change_percentage?.toLocaleString(undefined, {
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
                      <h2 className="text-sm sm:text-lg font-ath font-bold">Current price</h2>
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
                              'text-sm font-ath font-black rounded-full',
                              getPercentChangeColorClassName(pc)
                            )}>
                            {assetData.ath_change_percentage?.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
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
                            Current price ({formatNumber(assetData.current_price)}) is above
                            previous all-time high price!
                          </p>
                        </div>
                        <p className="text-md text-black font-ath font-light pt-1">
                          Once the {assetData.name} rocketship takes a breather, the all-time high
                          value will update.
                        </p>
                      </span>
                    </span>
                    <a
                      className="p-3 inline-block sm:hidden border bg-[rgba(255,255,255,0.6)] rounded-md border-solid border-gray-300 shadow-sm border-px coingecko-link transition-all"
                      href={`https://www.coingecko.com/en/coins/${assetData.id}/usd`}
                      rel="noopener noreferrer"
                      target="_blank">
                      <p className="font-ath font-light text-sm text-gray-700 sm:text-right">
                        Data accurate as of <TimeAgo date={lastUpdated} />
                      </p>
                      <div className="flex flex-row items-center justify-start pt-2">
                        <Image alt="CoinGecko logo" height={20} src="/cglogo.svg" width={20} />
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
                        backgroundColor: rgbaStringFromRGBObj(palette.Vibrant.rgb, 0.25),
                      }}
                    />
                    {/* Current price (hidden on desktop, shown on mobile) */}
                    <div className="flex sm:hidden flex-col justify-between w-full">
                      <div className="text-right">
                        <h2 className="text-sm sm:text-lg font-ath font-bold">Current price</h2>
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
                                'text-md font-ath font-black rounded-full mb-4',
                                getPercentChangeColorClassName(pc)
                              )}>
                              {assetData.ath_change_percentage?.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}
                              %
                            </p>
                          </div>
                        </div>
                      </div>
                      <a
                        className="p-3 inline-block border bg-[rgba(255,255,255,0.6)] rounded-md border-solid border-gray-300 shadow-sm border-px mt-0 sm:ml-4 coingecko-link transition-all"
                        href={`https://www.coingecko.com/en/coins/${assetData.id}/usd`}
                        rel="noopener noreferrer"
                        target="_blank">
                        <p className="font-ath font-light text-sm text-gray-700 sm:text-right">
                          Data accurate as of <TimeAgo date={lastUpdated} />
                        </p>
                        <div className="flex flex-row items-center justify-start pt-2">
                          <Image alt="CoinGecko logo" height={20} src="/cglogo.svg" width={20} />
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
                  target="_blank">
                  <p className="font-ath font-light text-sm text-gray-700 sm:text-right">
                    Data accurate as of <TimeAgo date={lastUpdated} />
                  </p>
                  <div className="flex flex-row items-center justify-start">
                    <Image alt="CoinGecko logo" height={20} src="/cglogo.svg" width={20} />
                    <p className="font-ath font-light text-xs text-gray-600 leading-none pl-2 sm:text-right">
                      Powered by CoinGecko
                    </p>
                  </div>
                </a>
                <p className="pt-8 pb-5 text-lg md:text-2xl font-ath font-normal text-black max-w-md md:max-w-xl">
                  {`The all-time highest price ever paid for ${assetData.name} was ${formatNumber(
                    ath
                  )} USD. This ATH price was set on ${athDate}.`}
                </p>
              </>
            ) : (
              <>
                <h2 className="text-3xl font-ath font-black pt-5">
                  No price data found for {assetData.symbol.toUpperCase()}
                </h2>
                <div className="bg-white p-3 inline-block mt-4 border-solid border-gray-200 border-px">
                  <div className="flex flex-row items-center justify-start">
                    <Image alt="CoinGecko logo" height={20} src="/cglogo.svg" width={20} />
                    <a
                      className="font-ath font-light text-xs text-gray-700 leading-none px-2"
                      href={`https://www.coingecko.com/en/coins/${asset.id}/usd`}
                      rel="noopener noreferrer"
                      target="_blank">
                      Powered by CoinGecko data
                    </a>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div
        className="w-full bg-white pb-2 md:pb-4"
        style={{
          backgroundImage: `linear-gradient(${rgbaStringFromRGBObj(
            palette.Vibrant.rgb,
            0.085
          )}, rgba(255,255,255,0))`,
          // borderBottom: `${assetColors.vibrant} 3px solid`,
        }}>
        <div className="p-5 mx-auto max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-ath font-black pt-4 pb-2">
            About {assetData.name}
          </h2>
          {!descIsEmpty && (
            <div className="max-w-xl">
              <h3 className="text-gray-500 pb-2">Description</h3>
              <div className={`${descriptionIsExpanded ? 'h-auto' : 'h-20 overflow-hidden'}`}>
                {parse(descArrayAsHtml)}
              </div>
              <button
                className="w-full bg-gray-200 opacity-50 mt-2 text-gray-500 font-ath text-sm px-2 py-2"
                onClick={() => {
                  setDescriptionIsExpanded((current) => !current)
                }}>
                {descriptionIsExpanded ? 'Show less' : 'Show more'}
              </button>
            </div>
          )}
          <div>
            <h3 className="text-gray-500 pb-1 pt-5">Market Cap</h3>
            <div className="max-w-xl">
              <p className="font-ath text-xl font-black">
                {assetData.market_cap === 0 ? '?' : `$${formatNumber(assetData.market_cap)}`}
              </p>
            </div>
          </div>
          <LinksSection assetInfoExtended={assetInfoExtended} palette={palette} />
        </div>
      </div>
      <div className="w-full bg-white">
        <div
          className="mt-5 h-1 w-full"
          style={{
            backgroundColor:
              assetColors !== undefined
                ? rgbaStringFromRGBObj(palette.Vibrant.rgb, 0.25)
                : '#00FFBA',
          }}
        />
        <div className="p-5 mx-auto max-w-4xl">
          {!singleAssetMatch && (
            <div className="bg-white border border-px border-solid border-gray-300 mt-10 p-5">
              <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row items-center justify-start">
                  <svg
                    className="h-5 w-5 text-gray-400 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                  <p className="font-ath font-light text-lg text-gray-600">
                    The ticker symbol ”<span className="font-bold">{assetid.toUpperCase()}</span>”
                    also represents other assets
                  </p>
                </div>
                <button
                  className="bg-white px-2 py-1 mx-2 text-gray-800 text-sm font-ath flex flex-row items-center justify-center"
                  onClick={() => {
                    setShowSymbolSharerAssets(!showSymbolSharerAssets)
                  }}>
                  {!showSymbolSharerAssets ? 'Show' : 'Hide'}
                  <svg
                    className={`h-3 w-3 ml-2 ${
                      showSymbolSharerAssets
                        ? 'transform rotate-180 duration-300 transition-all'
                        : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M19 9l-7 7-7-7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                </button>
              </div>
              {showSymbolSharerAssets && (
                <>
                  {assetInfo.map((asset: any, index: number) => {
                    const athTimestamp = parseISO(assetInfo[index]?.ath_date)
                    const athDate = format(athTimestamp, 'MMMM do, yyyy')
                    const athTimestampFormatted = formatInTimeZone(athTimestamp, 'h:mm:ss a', 'UTC')
                    const lastUpdated = parseISO(assetInfo[index].last_updated)
                    if (index !== 0)
                      return (
                        <div key={`shared-${index}`} className="pt-4">
                          <div className="h-px w-full bg-gray-200 mb-5" />
                          <div className="flex flex-row py-2">
                            <Image
                              alt={`${assetInfo[index].name} logo`}
                              height={25}
                              src={assetInfo[index].image}
                              width={25}
                            />
                            <h1 className="font-ath ml-2 font-bold text-lg">
                              {assetInfo[index].name} ({assetid.toUpperCase()})
                            </h1>
                          </div>
                          <h2 className="text-md font-ath font-black">
                            All-time high price in USD
                          </h2>
                          <div className="inline-block">
                            <div
                              className="h-1 w-full -mb-4 mt-2"
                              style={{
                                backgroundColor: assetColorsExtended[index].vibrant,
                              }}
                            />
                            <h3 className="text-2xl md:text-4xl text-black font-ath font-black inline-block mt-4 mb-4">
                              {assetInfo[index].ath.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                              })}
                            </h3>
                          </div>
                          <p className="font-ath font-light text-lg text-gray-600">
                            Set <TimeAgo suppressHydrationWarning date={athTimestamp} />
                          </p>
                          <p className="font-ath font-light text-xs text-gray-600">
                            on {athDate} at {athTimestampFormatted}
                          </p>
                          <div className="bg-white p-3 inline-block mt-4 border border-dotted border-gray-100">
                            <div className="flex flex-row items-center justify-start">
                              <Image
                                alt="CoinGecko logo"
                                height={15}
                                src="/cglogo.svg"
                                width={15}
                              />
                              <a
                                className="font-ath font-light text-xs text-gray-800 leading-none px-2"
                                href={`https://www.coingecko.com/en/coins/${asset.id}/usd`}
                                rel="noopener noreferrer"
                                target="_blank">
                                Data accurate as of{' '}
                                <TimeAgo suppressHydrationWarning date={lastUpdated} />
                              </a>
                            </div>
                          </div>
                        </div>
                      )
                  })}
                </>
              )}
            </div>
          )}
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="p-5">
            <p className="font-ath text-base md:text-xl font-bold mt-10 mb-2 text-gray-400">
              All-time highs of other assets
            </p>
            {!marketLoading ? (
              <>
                {market.map((asset: any, index: number) => {
                  if (index < 100)
                    return <AssetListItem showTimeSince asset={asset} index={index} />
                })}
              </>
            ) : (
              <SkeletonTheme
                // color={rgbaStringFromRGBObj(palette.Vibrant.rgb, 0.085)}
                highlightColor={rgbaStringFromRGBObj(palette.Vibrant.rgb, 0.25)}>
                <Skeleton count={10} height={97} />
              </SkeletonTheme>
            )}
          </div>
        </div>
      </div>
      <style global jsx>{`
        ::-moz-selection {
          color: black !important;
          background: ${rgbaStringFromRGBObj(palette.Vibrant.rgb, 0.85)} !important;
        }
        ::selection {
          color: black !important;
          background: ${rgbaStringFromRGBObj(palette.Vibrant.rgb, 0.85)} !important;
        }
        #nprogress .bar {
          height: 5px;
          background: ${rgbaStringFromRGBObj(palette.Vibrant.rgb, 1)} !important;
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
          background-color: ${rgbaStringFromRGBObj(palette.Vibrant.rgb, 0.075)};
        }
        .desc-p {
          @apply text-gray-500 py-0.5 font-ath font-light;
        }
        .desc-a {
          color: ${rgbaStringFromRGBObj(palette.DarkVibrant.rgb, 0.85)};
        }
      `}</style>
    </Layout>
  )
}

export async function getServerSideProps(context: any) {
  const { params } = context
  let props: any = {}

  const numberOfSlashes = context?.req?.url?.split('/')?.length - 1

  const { assetid } = params

  props.assetid = assetid

  const list = await cache.fetch('ath:full-list', fetchList, 60 * 60 * 12)

  props.list = list

  const asset = list.find((x: any) => {
    return x.symbol.toLowerCase() === assetid.toLowerCase()
  })

  const matchingAssets = list.filter((x: any) => {
    return x.symbol.toLowerCase() === assetid.toLowerCase()
  })

  if (
    matchingAssets.length === 0 ||
    // for when a token with the ticker API inevitably gets listed on coingecko
    (assetid?.toLowerCase() === 'api' && !(numberOfSlashes > 1))
  ) {
    return {
      notFound: true,
    }
  } else {
    try {
      props.asset = asset

      const singleAssetMatch = matchingAssets.length === 1
      props.singleAssetMatch = singleAssetMatch

      let assetCoingeckoId = ''

      if (singleAssetMatch) {
        assetCoingeckoId = asset.id
      } else {
        // multiple found with same ticker symbol
        const multipleAssetsArray: any = []
        matchingAssets.map((matchingAssetObject: any) => {
          multipleAssetsArray.push(matchingAssetObject.id)
        })
        assetCoingeckoId = multipleAssetsArray.join(',')
      }

      const assetsResponse = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${assetCoingeckoId}`
      )

      const assetInfo = await assetsResponse.json()
      props.assetInfo = assetInfo

      const assetInfoExtended =
        await fetch(`https://api.coingecko.com/api/v3/coins/${assetInfo[0].id}?localization=en&tickers=true&market_data=false&community_data=true&developer_data=true&sparkline=false
      `)
      props.assetInfoExtended = await assetInfoExtended.json()

      let palette: any
      if (singleAssetMatch) {
        palette = await getImg(assetInfo[0].image)
      } else {
        palette = await getImg(assetInfo[0].image)
        const paletteExtended = await Promise.all(
          assetInfo.map(async (a: any, i: any) => {
            const p = await getImg(a.image)
            return JSON.parse(JSON.stringify(p))
          })
        )
        props.paletteExtended = paletteExtended
      }

      if (palette.Vibrant === null) palette.Vibrant = { rgb: [125, 125, 125] }
      if (palette.DarkVibrant === null) palette.DarkVibrant = { rgb: [125, 125, 125] }
      if (palette.LightVibrant === null) palette.LightVibrant = { rgb: [125, 125, 125] }
      if (palette.Muted === null) palette.Muted = { rgb: [125, 125, 125] }
      if (palette.DarkMuted === null) palette.DarkMuted = { rgb: [125, 125, 125] }
      if (palette.LightMuted === null) palette.LightMuted = { rgb: [125, 125, 125] }

      props.palette = JSON.parse(JSON.stringify(palette))
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e)
      return {
        props: {},
      }
    }
  }

  return {
    props,
  }
}

export default AssetPage
