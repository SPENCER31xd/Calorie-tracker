import React from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";

const PriceChart = () => {
  const { stats } = useSelector((state) => state.food);
  const {monthly_budget} = useSelector(state => state.auth.user)
  const options = {
    chart: {
      height: 350,
      type: "radialBar",
      offsetY: -10,
      fontFamily: "poppins",
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        dataLabels: {
          name: {
            fontSize: "13px",
            offsetY: 120,
            fontWeight: 500,
            color: "grey",
          },
          value: {
            offsetY: 76,
            fontSize: "22px",
            color: undefined,
            formatter: function (val) {
              return val + "%";
            },
          },
        },
      },
    },
    fill: {
      type: "solid",
      colors: ["#f50057"],
    },
    stroke: {
      dashArray: 4,
    },
    labels: [`Total Cost (${stats?.today_price}/${monthly_budget})`],
  };
  const series = [((stats?.today_price / monthly_budget) * 100).toFixed(1)];
  return (
    <Chart options={options} series={series} type="radialBar" height={250} />
  );
};

export default PriceChart;
