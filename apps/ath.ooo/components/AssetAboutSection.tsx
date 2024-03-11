import { rgbaStringFromRGBObj } from '@repo/utils/colors'
import { useState } from 'react'
import parse from 'html-react-parser'
import { formatNumber } from '@repo/utils/numbers'
import LinksSection from './LinksSection'
import { format, parseISO } from 'date-fns'
// import { formatInTimeZone } from '@repo/utils/timestamps'
import Image from 'next/image'
import TimeAgo from './TimeAgo'

interface AssetAboutSectionProps {
  assetData: any
  palette: any
  assetInfoExtended: any
  assetColors: any
  assetColorsExtended: any
  singleAssetMatch: boolean
  assetid: string
  assetInfo: any
}

export const AssetAboutSection = ({
  assetData,
  assetInfoExtended,
  assetInfo,
  assetColors,
  assetColorsExtended,
  palette,
  singleAssetMatch,
  assetid,
}: AssetAboutSectionProps) => {
  const [showSymbolSharerAssets, setShowSymbolSharerAssets] = useState(false)

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
    <>
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
                    // const athTimestampFormatted = formatInTimeZone(athTimestamp, 'h:mm:ss a', 'UTC')
                    const athTimestampFormatted = format(athTimestamp, 'h:mm:ss a')
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
      </div>
    </>
  )
}
