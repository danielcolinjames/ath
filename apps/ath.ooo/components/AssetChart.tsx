import { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { rgbaStringFromRGBObj } from '../utils/colors'
import { formatNumber } from '../utils/numbers'
import { Chart, registerables } from 'chart.js'
import { fromUnixTime, format, parseISO, differenceInDays, getUnixTime, sub } from 'date-fns'
Chart.register(...registerables)

interface AssetChartProps {
  assetData: any
  assetInfo: any
  assetColors: any
  palette: any
  className: string
  wrapperClassName: string
}

const AssetChart = ({
  assetData,
  assetInfo,
  assetColors,
  palette,
  className,
  wrapperClassName,
}: AssetChartProps) => {
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

  if (!(data?.length > 0)) {
    return (
      <div className="max-h-[30vh] max-w-4xl mx-auto px-5 py-1" style={{ height: 600 }}>
        <p className="text-xs text-gray-200 font-ath">
          Normally there would be a price chart here, but an error occured
        </p>
      </div>
    )
  }

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

  const chartData: any = { labels, datasets }

  return (
    <div className={wrapperClassName}>
      <Line
        className={className}
        data={chartData}
        height={600}
        options={{
          layout: { autoPadding: false },
          hover: { intersect: false },
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              intersect: false,
              mode: 'index',
              callbacks: {
                //This removes the tooltip title
                // title: function () {},
                label: ({ raw }: { raw: unknown }) => {
                  const number = parseFloat(raw as string)
                  return `$${formatNumber(number)}`
                },
              },
              //this removes legend color
              displayColors: false,
              padding: 15,
              position: 'average',
              caretSize: 10,
              backgroundColor: 'rgba(255,255,255,.9)',
              borderColor: rgbaStringFromRGBObj(palette.Vibrant.rgb, 0.35),
              borderWidth: 2,
              bodyFont: {
                family: 'Satoshi',
                size: 18,
              },
              bodyColor: '#303030',
              titleFont: {
                family: 'Satoshi',
              },
              titleColor: 'rgba(0,0,0,0.6)',
            },
          },
          scales: {
            y: {
              border: {
                display: false,
              },
              ticks: {
                display: false,
              },
              grid: {
                display: false,
                drawTicks: false,
                color: 'transparent',
              },
            },
            x: {
              border: {
                display: false,
              },
              ticks: {
                display: false,
              },
              grid: {
                drawTicks: false,
                display: false,
              },
            },
          },
          maintainAspectRatio: false,
        }}
      />
    </div>
  )
}
export default AssetChart
