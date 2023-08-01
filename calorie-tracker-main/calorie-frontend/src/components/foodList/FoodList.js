import moment from "moment";
import React, { useEffect, useState } from "react";
import { PlusSquare, X } from "react-feather";
import { useDispatch } from "react-redux";
import { openFoodModal } from "../../redux/features/modals/addFoodSlice";
import ListItem from "./ListItem";

const FoodList = ({ data }) => {
  const dispatch = useDispatch();
  const [foodList, setFoodList] = useState(data);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  useEffect(() => {
    if (startDate && endDate) {
      setFoodList(
        data.filter((item) => item.date >= startDate && item.date <= endDate)
      );
    } else {
      setFoodList(data);
    }
  }, [startDate, endDate]);
  useEffect(() => {
    setFoodList(data);
  }, [data]);
  const clearFilters = () => {
    setStartDate("");
    setEndDate("");
  };
  return (
    <div className="grow">
      <div className="border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="font-medium text-base">Food Items</div>
          {window.location.pathname.match("/admin") ? (
            <></>
          ) : (
            <button
              onClick={() => dispatch(openFoodModal({ type: "add" }))}
              className="flex items-center gap-2 border-2 font-medium hover:bg-gray-200 py-1.5 px-2.5 rounded-md"
            >
              <PlusSquare size={20} />
              Add food
            </button>
          )}
        </div>
        <div className="flex items-end gap-5 my-5 justify-between">
          <div className="flex items-center gap-3">
            <div>
              <div className="text-xs">From</div>
              <input
                className="border p-1 rounded-md outline-none text-xs"
                type="date"
                value={startDate}
                name="startDate"
                max={moment().format("YYYY-MM-DD")}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div>
              <div className="text-xs">To</div>
              <input
                className="border p-1 rounded-md outline-none text-xs"
                type="date"
                value={endDate}
                name="endDate"
                disabled={!startDate ? true: false}
                min={startDate}
                max={moment().format("YYYY-MM-DD")}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
          <button
            onClick={() => clearFilters()}
            className="text-gray-500 flex items-center gap-1 hover:text-black"
          >
            <X size={15} />
            Clear filter
          </button>
        </div>
      </div>
      {foodList?.length === 0 ? (
        <div className="text-center mt-16 text-gray-400">
          Start tracking your calories
        </div>
      ) : (
        <table className="mt-8 w-full">
          <tr>
            <th>Food name</th>
            <th>Date</th>
            <th>Price (₹)</th>
            <th>Calories (kcal)</th>
            <th></th>
          </tr>
          {foodList?.map((item) => {
            return <ListItem item={item} key={item._id} />;
          })}
        </table>
      )}
    </div>
  );
};

export default FoodList;
