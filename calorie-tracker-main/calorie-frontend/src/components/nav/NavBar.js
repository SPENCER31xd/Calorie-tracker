import React from "react";
import Lottie from "lottie-react";
import logo from "../../assets/logo.json";
import { useSelector } from "react-redux";

const NavBar = () => {
  const { email, picture, name } = useSelector((state) => state.auth.user);
  return (
    <div className="w-full flex items-center justify-between py-5 px-10 border-b bg-white">
      <div className="font-medium flex items-center">
        <Lottie animationData={logo} loop={true} className="w-16" />
        <div>
          CALORIE TRACKER
          <div className="text-xs italic text-gray-500">track your intake</div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="text-xs text-medium text-gray-500">
          <div className="font-medium text-black">{name}</div>
          <div>{email}</div>
        </div>
        <img
          src={
            picture
              ? picture
              : "https://ionicframework.com/docs/img/demos/avatar.svg"
          }
          alt="profile"
          className="w-10 h-10 rounded-full object-contain"
        />
      </div>
    </div>
  );
};

export default NavBar;
