import Link from 'next/link'
import Image from 'next/image'
import { formatNumber } from '@repo/utils/numbers'
import { parseISO } from 'date-fns'
import TimeAgo from './TimeAgo'

const AssetListItem = ({
  asset,
  index,
  showGreenLine,
  showTimeSince,
}: {
  asset: any
  index: number
  showGreenLine?: boolean
  showTimeSince?: boolean
}) => {
  const athTimestamp = parseISO(asset.ath_date)

  const test = (
    <>
      <span className="flex flex-row items-center justify-center">
        <Image alt={`${asset.name} logo`} className="" height={20} src={asset.image} width={20} />{' '}
        <span className="pl-2 font-bold text-right">
          {asset.symbol.toUpperCase()}
          <span className="pl-2 text-gray-400 font-medium">{asset.name}</span>
        </span>
      </span>
    </>
  )

  return (
    <Link
      key={`${asset.id}-${index}`}
      className={`py-5 group ${
        index !== 0 ? 'border-t' : ''
      } border-gray-200 text-lg sm:text-lg text-gray-700 font-semibold flex flex-col sm:flex-row items-start sm:items-center sm:justify-between font-ath`}
      href={`/${asset.symbol.toUpperCase()}`}>
      <span className="flex flex-row items-center justify-center">
        <Image alt={`${asset.name} logo`} className="" height={20} src={asset.image} width={20} />{' '}
        <span className="pl-2 font-bold text-right">
          {asset.symbol.toUpperCase()}
          <span className="pl-2 text-gray-400 font-medium">{asset.name}</span>
        </span>
      </span>
      <span className="flex flex-col items-start sm:items-end">
        <span className="inline-block">
          {showGreenLine && (
            <div className="h-1 transform bg-transparent transition-all ease-in-out duration-200 group-hover:-translate-y-2 group-hover:bg-ath-100 group-hover:scale-110 w-full -mb-1 mt-3 sm:mt-0 sm:-mb-1" />
          )}
          <span className="font-bold text-black text-xl pt-2 sm:pt-0 sm:text-lg">
            {formatNumber(asset.ath)} USD
          </span>
        </span>
        {showTimeSince && (
          <span className="text-gray-400 font-normal">
            <TimeAgo suppressHydrationWarning date={athTimestamp} />
          </span>
        )}
      </span>
    </Link>
  )
}

export default AssetListItem
