import React from "react";
import {
  Home,
  PieChart,
  User,
  ExternalLink,
  Power,
  Shield,
} from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/features/auth/authSlice";
import { openInviteModal } from "../../redux/features/modals/inviteFriendSlice";

const SideBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { roles } = useSelector((state) => state.auth.user);
  return (
    <div className="border-r py-10 px-7 flex flex-col justify-between">
      <div className="flex flex-col gap-7 ">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "bg-black text-white p-3 rounded-lg" : "p-3 rounded-lg"
          }
        >
          <Home size={20} />
        </NavLink>
        <NavLink
          to="progress"
          className={({ isActive }) =>
            isActive ? "bg-black text-white p-3 rounded-lg" : "p-3 rounded-lg"
          }
        >
          <PieChart size={20} />
        </NavLink>
        <NavLink
          to="profile"
          className={({ isActive }) =>
            isActive ? "bg-black text-white p-3 rounded-lg" : "p-3 rounded-lg"
          }
        >
          <User size={20} />
        </NavLink>
        {roles.includes("Admin") ? (
          <NavLink
            to="admin"
            className={({ isActive }) =>
              isActive ? "bg-black text-white p-3 rounded-lg" : "p-3 rounded-lg"
            }
          >
            <Shield size={20} />
          </NavLink>
        ) : null}
        <button
          onClick={() => dispatch(openInviteModal())}
          className="p-3 rounded-lg"
        >
          <ExternalLink size={20} />
        </button>
      </div>
      <button
        onClick={() => dispatch(logoutUser())}
        className="text-xs font-medium flex flex-col gap-1 items-center text-gray-600 hover:text-black"
      >
        <Power size={20} />
        Logout
      </button>
    </div>
  );
};

export default SideBar;
