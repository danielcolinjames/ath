import { useState, useEffect } from 'react'
import AssetListItem from 'components/AssetListItem'
import { rgbaStringFromRGBObj } from 'utils/colors'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

export const OtherAssetATHList = ({ palette }: { palette: any }) => {
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

  return (
    <div className="max-w-4xl mx-auto">
      <div className="p-5">
        <p className="font-ath text-base md:text-xl font-bold mt-10 mb-2 text-gray-400">
          All-time highs of other assets
        </p>
        {!marketLoading ? (
          <>
            {market.map((asset: any, index: number) => {
              if (index < 100) return <AssetListItem showTimeSince asset={asset} index={index} />
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
  )
}
