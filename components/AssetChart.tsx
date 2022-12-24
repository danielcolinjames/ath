import { Line } from 'react-chartjs-2'
import { rgbaStringFromRGBObj } from '../utils/colors'
import { formatNumber } from '../utils/numbers'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

const AssetChart = ({
  data,
  palette,
  className,
  wrapperClassName,
}: {
  data: any
  palette: any
  className: string
  wrapperClassName: string
}) => {
  return (
    <div className={wrapperClassName}>
      <Line
        className={className}
        data={data}
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
                label: ({ raw }) => {
                  return `$${formatNumber(raw)}`
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
