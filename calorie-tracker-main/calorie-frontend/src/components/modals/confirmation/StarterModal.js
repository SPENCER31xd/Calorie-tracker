import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const StarterModal = () => {
  const { name } = useSelector((state) => state.auth.user);
  return (
    <div className="absolute top-0 left-0 w-full h-screen bg-black/50 flex items-center justify-center">
      <div className="bg-white shadow w-1/3 rounded-lg p-6">
        <div className="font-medium mb-5">
          Hello {name}! Please finish your profile to start tracking your
          calories.
        </div>
        <div className="flex items-center justify-center gap-3">
          <NavLink
            to="profile"
            className="bg-black text-white rounded-lg p-2 w-32 text-center"
          >
            Get to profile
          </NavLink>
          {/* <button className="bg-gray-200 rounded-lg p-2 w-32 text-center">Cancel</button> */}
        </div>
      </div>
    </div>
  );
};

export default StarterModal;
