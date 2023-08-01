import moment from "moment";
import React from "react";
import Chart from "react-apexcharts";

const DoubleColumnChart = ({
  data,
  color,
  text,
  yLimit,
  yTitle,
  name,
  heading,
}) => {
  const series = data?.series;
  const options = {
    chart: {
      type: "bar",
      height: 350,
      fontFamily: "poppins",
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
      fontFamily: "poppins",
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories:
        name === "daily"
          ? data?.categories.map((item) => moment(item).format("DD-MMM-YYYY"))
          : data?.categories.map((item) => moment(item).format("MMM")),
    },
    colors: [color],
    yaxis: {
      title: {
        text: yTitle,
      },
      max: yLimit + 1000,
      tickAmount: 5,
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val;
        },
      },
    },
    annotations: {
      yaxis: [
        {
          y: yLimit,
          borderColor: "#000000",
          label: {
            borderColor: "#000000",
            style: {
              color: "#fff",
              background: "#000000",
            },
            text: text,
          },
        },
      ],
    },
  };

  return (
    <>
      <div className="font-medium">{heading}</div>
      <Chart options={options} series={series} type="bar" height={240} />
    </>
  );
};

export default DoubleColumnChart;
