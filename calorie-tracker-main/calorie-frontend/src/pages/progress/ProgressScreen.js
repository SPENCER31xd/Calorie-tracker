import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/loader/Loader";
import {
  getDailyProgressStats,
  getMonthlyCostStats,
} from "../../redux/features/food/foodSlice";
import DoubleColumnChart from "./DoubleColumnChart";

const ProgressScreen = () => {
  const dispatch = useDispatch();
  const [dailyProgrees, setDailyProgrees] = useState(null);
  const [monthlyCost, setMonthlyCost] = useState(null);
  const { calorie_intake, monthly_budget } = useSelector(
    (state) => state.auth.user
  );
  useEffect(() => {
    dispatch(getDailyProgressStats())
      .unwrap()
      .then((res) => setDailyProgrees(res));
    dispatch(getMonthlyCostStats())
      .unwrap()
      .then((res) => setMonthlyCost(res));
  }, []);
  return (
    <>
      {dailyProgrees && (
        <DoubleColumnChart
          data={dailyProgrees}
          color="#2196f3"
          text={`Daily calories limit (${calorie_intake} kcal)`}
          yLimit={calorie_intake}
          yTitle="Calories (kcal)"
          name="daily"
          heading="Daily progress"
        />
      )}

      {monthlyCost && (
        <DoubleColumnChart
          data={monthlyCost}
          color="#f50057"
          text={`Monthly budget limit (₹ ${monthly_budget})`}
          yLimit={monthly_budget}
          yTitle="Cost (₹)"
          name="monthly"
          heading="Monthly budget"
        />
      )}
      {!dailyProgrees && !monthlyCost && <Loader />}
    </>
  );
};

export default ProgressScreen;
