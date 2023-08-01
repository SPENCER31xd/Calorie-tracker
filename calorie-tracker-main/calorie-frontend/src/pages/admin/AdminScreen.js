import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import FoodList from "../../components/foodList/FoodList";
import Loader from "../../components/loader/Loader";
import {
  getUserData,
  getUserNames,
} from "../../redux/features/admin/adminSlice";
import Analytics from "./Analytics";
import UserList from "./UserList";

const AdminScreen = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { activeData, loading } = useSelector((state) => state.adminData);
  const dispatch = useDispatch();
  const [users, setUsers] = useState(null);
  useEffect(() => {
    if (searchParams.get("id")) {
      dispatch(getUserData(searchParams.get("id")));
    }
  }, [searchParams.get("id")]);
  useEffect(() => {
    dispatch(getUserNames())
      .unwrap()
      .then((res) => {
        setUsers(res);
        setSearchParams({ id: res[0]._id });
      });
  }, []);
  return (
    <div>
      <Analytics />
      <div className="flex gap-10">
        <UserList data={users} />
        <div className="grow">
          <FoodList data={activeData} />
        </div>
      </div>
      {loading && <Loader />}
    </div>
  );
};

export default AdminScreen;
