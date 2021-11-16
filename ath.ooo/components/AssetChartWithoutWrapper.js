// import { Line } from "react-chartjs-2";
import { useRef, useEffect } from "react";
import Chart from "chart.js/auto";
import { rgbaStringFromRGBObj } from "../utils/colors";
import { formatNumber } from "../utils/numbers";

const AssetChart = ({ data, palette, className, wrapperClassName }) => {
  const chartRef = useRef();

  useEffect(() => {
    const ctx = chartRef?.current?.getContext("2d");
    const chart = new Chart(ctx, {
      type: "line",
      data: data,
      height: 600,
      options: {
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
      },
    });
    return () => {
      // cleanup
      chart.destroy();
    };
  }, [data]);

  return (
    <div className={wrapperClassName}>
      <div className={className}>
        <canvas id="chart" ref={chartRef} />
      </div>
    </div>
  );
};
export default AssetChart;
