import { Line } from "react-chartjs-2";
// import 'chartjs-adapter-date-fns';
import { rgbaStringFromRGBObj } from "../utils/colors";
import { formatNumber } from "../utils/numbers";
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const AssetChart = ({ data, palette, className, wrapperClassName }) => {
  return (
    <div className={wrapperClassName}>
      <Line
        data={data}
        className={className}
        height={600}
        options={{
          layout:{ autoPadding: false,},
          hover: { intersect: false },
          borderWidth: 100,
          backdropPadding: 0,
          padding: 0,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              intersect: false,
              mode: "index",
              callbacks: {
                //This removes the tooltip title
                // title: function () {},
                label: ({ raw }) => {
                  return `$${formatNumber(raw)}`;
                },
              },
              //this removes legend color
              displayColors: false,
              padding: 15,
              position: "average",
              pointHitRadius: 20,
              pointRadius: 30,
              caretSize: 10,
              backgroundColor: "rgba(255,255,255,.9)",
              borderColor: rgbaStringFromRGBObj(palette.Vibrant.rgb, 0.35),
              borderWidth: 2,
              bodyFont: {
                family: "Satoshi",
                size: 18,
              },
              bodyColor: "#303030",
              titleFont: {
                family: "Satoshi",
              },
              titleColor: "rgba(0,0,0,0.6)",
            },
          },
          scales: {
            y: {
              ticks: {
                display: false,
              },
              grid: {
                drawBorder: false,
                borderWidth: 0,
                drawTicks: false,
                color: "transparent",
                width: 0,
                backdropPadding: 0,
              },
              drawBorder: false,
              drawTicks: false,
            },
            x: {
              ticks: {
                display: false,
              },
              grid: {
                drawBorder: false,
                borderWidth: 0,
                drawTicks: false,
                display: false,
              },
            },
          },
          maintainAspectRatio: false,
        }}
      />
    </div>
  );
};
export default AssetChart;
