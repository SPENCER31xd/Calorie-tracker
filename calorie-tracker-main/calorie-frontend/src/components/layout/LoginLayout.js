import React from "react";
import jwtDecode from "jwt-decode";
import Lottie from "lottie-react";
import logo from "../../assets/logo.json";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/features/auth/authSlice";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import { Toaster } from "react-hot-toast";

const LoginLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);
  return (
    <>
      <Toaster />
      <div className="flex flex-col items-center justify-between h-screen w-full py-10">
        <div className="font-medium flex items-center mb-10">
          <Lottie animationData={logo} loop={true} className="w-24" />
          <div className="text-lg">
            CALORIE TRACKER
            <div className="text-xs italic text-gray-500">
              track your intake
            </div>
          </div>
        </div>
        <div className="w-80 flex flex-col gap-8">
          <Outlet />
          <div className="flex items-center gap-2">
            <hr className="border grow" />
            <div className="font-medium text-xs">OR</div>
            <hr className="border grow" />
          </div>
        </div>
        <div className="text-s font-medium">
          Dont't you have an account?{" "}
          <Link
            to="/register"
            className="text-gray-500 hover:text-black hover:underline cursor-pointer"
          >
            Register
          </Link>
        </div>
      </div>
      {loading && <Loader />}
    </>
  );
};

export default LoginLayout;
