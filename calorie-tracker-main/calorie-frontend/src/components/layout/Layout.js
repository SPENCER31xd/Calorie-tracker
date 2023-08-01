import React from "react";
import NavBar from "../nav/NavBar";
import SideBar from "../sidebar/SideBar";
import { Navigate, Outlet } from "react-router-dom";
import AddFood from "../modals/addFood/AddFood";
import InviteFriend from "../modals/inviteFriend/InviteFriend";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";

const Layout = () => {
  const { token } = useSelector((state) => state.auth);
  return token ? (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="grow flex">
        <SideBar />
        <div className="w-full py-10 px-16">
          <Outlet />
        </div>
      </div>

      {/* modals */}
      <AddFood />
      <InviteFriend />
      <Toaster />
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default Layout;
