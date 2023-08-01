import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FoodList from "../../components/foodList/FoodList";
import Loader from "../../components/loader/Loader";
import StarterModal from "../../components/modals/confirmation/StarterModal";
import { getUserProfile } from "../../redux/features/auth/authSlice";
import TodayAnalytics from "./TodayAnalytics";

const HomeScreen = () => {
  const { loading } = useSelector((state) => state.food);
  const { food } = useSelector((state) => state.auth.user);
  const { calorie_intake } = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!calorie_intake) {
      setOpen(true);
    }
  }, [calorie_intake]);
  useEffect(() => {
    dispatch(getUserProfile());
  }, []);
  return (
    <>
      <div className="flex gap-20 w-full">
        <FoodList data={food} />
        <TodayAnalytics />
      </div>
      {loading && <Loader />}
      {open && <StarterModal />}
    </>
  );
};

export default HomeScreen;
