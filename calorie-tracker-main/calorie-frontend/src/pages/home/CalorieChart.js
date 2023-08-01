import React from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";

const CalorieChart = () => {
  const { stats } = useSelector((state) => state.food);
  const {calorie_intake} = useSelector(state => state.auth.user)
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
      colors: ["#2196f3"],
    },
    stroke: {
      dashArray: 4,
    },
    labels: [`Total Calories (${stats?.today_calories}/${calorie_intake})`],
  };
  const series = [((stats?.today_calories / calorie_intake) * 100).toFixed(1)];
  return (
    <Chart options={options} series={series} type="radialBar" height={250} />
  );
};

export default CalorieChart;
