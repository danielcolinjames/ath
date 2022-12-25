import { useEffect } from 'react'
import { useState } from 'react'
import MetaTags from '../components/MetaTags'
import { Layout } from '../components/Layout'
import AssetListItem from '../components/AssetListItem'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import cache from '../utils/cache'
import { fetchList } from '../utils/coingecko'

const HomePage = ({ list }: { list: any }) => {
  const [marketLoading, setMarketLoading] = useState(false)
  const [market, setMarket] = useState([])

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
    getMarketData()
  }, [])

  return (
    <Layout assetList={list} className="">
      <div className="p-5 mx-auto max-w-4xl" style={{ minHeight: 'calc(100vh - 113px)' }}>
        <MetaTags
          description="See the all-time highs of crypto assets"
          openGraphImageAbsoluteUrl="https://ath.ooo/logo/2/og.png"
          title="ath.ooo — All-Time Highs"
          url="https://ath.ooo/"
        />
        <div className="pt-5 pb-10 max-w-md mb-10">
          <h1 className="text-xl md:text-3xl font-ath font-black mb-1">ath.ooo</h1>
          <h2 className="text-gray-700 text-lg md:text-2xl font-ath font-semi-bold mb-2">
            All-Time High Crypto Prices
          </h2>
          <p className="text-md md:text-md font-ath text-gray-500">
            This website displays the highest ever recorded price in US Dollars that someone has
            paid for any given crypto asset. Everything on here is powered by CoinGecko’s API.
          </p>
        </div>
        {!marketLoading ? (
          <ul className="flex flex-col">
            {market.map((asset, i) => {
              if (i < 200)
                return <AssetListItem showGreenLine showTimeSince asset={asset} index={i} />
            })}
          </ul>
        ) : (
          <SkeletonTheme highlightColor="white">
            <Skeleton count={10} height={97} />
          </SkeletonTheme>
        )}
      </div>
    </Layout>
  )
}

export async function getServerSideProps() {
  const list = await cache.fetch('ath:full-list', fetchList, 60 * 60 * 24)

  return {
    props: { list },
  }
}

export default HomePage
