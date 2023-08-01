import React, { useEffect } from "react";
import { AlertCircle } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import CalorieChart from "./CalorieChart";
import PriceChart from "./PriceChart";
import { toast } from "react-hot-toast";
import { getFoodStats } from "../../redux/features/food/foodSlice";

const TodayAnalytics = () => {
  const { stats } = useSelector((state) => state.food);
  const { calorie_intake, monthly_budget } = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFoodStats());
  }, []);
  useEffect(() => {
    if (stats?.today_calories > calorie_intake) {
      toast("Daily calories limit reached", {
        icon: <AlertCircle color="yellow" size={18} />,
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
    if (stats?.monthly_cost > monthly_budget) {
      toast("Monthly budget limit reached", {
        icon: <AlertCircle color="yellow" size={18} />,
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
  }, [stats?.total_calories, stats?.monthly_cost]);
  return (
    <div className="w-1/3">
      <div>
        <div className="text-center font-medium text-base border-b pb-4">
          Progress Today
        </div>
        <div className="grid grid-cols-2">
          <CalorieChart />
          <PriceChart />
        </div>
        <div className="flex flex-col gap-5 mt-10">
          {stats?.today_calories >= calorie_intake && (
            <div className="flex items-center gap-1 justify-center font-medium">
              <AlertCircle color="orange" size={22} />
              Daily calories limit reached
            </div>
          )}
          {stats?.monthly_cost >= monthly_budget && (
            <div className="flex items-center gap-1 justify-center font-medium">
              <AlertCircle color="orange" size={22} />
              Monthly budget limit reached
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodayAnalytics;
