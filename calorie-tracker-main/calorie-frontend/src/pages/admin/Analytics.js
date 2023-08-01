import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import DotsLoader from "../../components/loader/DotsLoader";
import { getStats } from "../../redux/features/admin/adminSlice";

const Analytics = () => {
  const dispatch = useDispatch();
  const [stats, setStats] = useState(null);
  useEffect(() => {
    dispatch(getStats())
      .unwrap()
      .then((res) => setStats(res));
  }, []);
  return (
    <div className="border-b mb-10 pb-10 flex gap-16 font-medium">
      <div>
        <div className="text-xs text-gray-500">
          Average no. of calories added per user in last 7 days
        </div>
        <div className="text-2xl">
          {stats ? (
            <>{stats?.average_calories_added_per_user} kcal</>
          ) : (
            <DotsLoader />
          )}
        </div>
      </div>
      <div>
        <div className="text-xs text-gray-500">
          Entries added in last 7 days
        </div>
        <div className="text-2xl">
          {stats ? <> {stats?.entries_last_7_days}</> : <DotsLoader />}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
