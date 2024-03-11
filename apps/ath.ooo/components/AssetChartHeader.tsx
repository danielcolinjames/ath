import Image from 'next/image'
import { rgbaStringFromRGBObj } from '@repo/utils/colors'

export const AssetChartHeader = ({
  assetData,
  assetid,
  palette,
  rank,
}: {
  assetData: any
  assetid: string
  palette: any
  rank: number
}) => {
  return (
    <div className="w-full z-10">
      <div className="max-w-4xl mx-auto">
        <div className="px-5 md:pt-4">
          <div className="w-full inline-block px-5 z-10 relative backdrop-blur-lg bg-[rgba(255,255,255,0.5)] py-3 -ml-5">
            <div className="flex flex-row items-center">
              <Image alt={`${assetData.name} logo`} height={50} src={assetData.image} width={50} />
              <div className="flex items-start justify-start flex-col ml-2.5 md:ml-4 -mt-0.5 ">
                <div className="flex items-center justify-center">
                  <p className="font-ath font-bold text-xl md:text-2xl text-gray-800">
                    {assetid.toUpperCase()}
                  </p>
                  {rank && (
                    <div
                      className="rounded-xl px-2 py-0.5 mt-0.5 ml-2.5 bg-opacity-50 backdrop-filter backdrop-blur-md flex flex-row items-center justify-center"
                      style={{
                        backgroundColor: rgbaStringFromRGBObj(palette.Vibrant.rgb, 0.5),
                      }}>
                      <p className="text-xs text-white font-sans font-light">#</p>
                      <p className="text-xs font-sans text-white font-semibold">{rank}</p>
                    </div>
                  )}
                </div>
                <p className="font-normal text-gray-500 -mt-1 pr-2">{assetData.name}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
