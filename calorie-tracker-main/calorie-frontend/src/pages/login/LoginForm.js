import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const navigate = useNavigate();

  const getErrorMsgForToast = () => {
    if (email && !password) {
      return "Please Enter Password!";
    } else if (!email && password) {
      return "Please Enter Email!";
    } else {
      return "Please Enter Your Credentials or Click Add Dummy Credential for Login!";
    }
  };

  const login = async () => {
    if (!email || !password) {
      toast.error(getErrorMsgForToast(), {
        style: {
          borderRadius: "10px",
          background: "#fff",
          color: "red",
        },
      });
      return;
    }
    const obj = {
      email: email,
    };
    dispatch(loginUser(obj))
      .unwrap()
      .then(() => navigate("/"));
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <div>
          <div className="text-xs font-medium mb-1">Email-ID</div>
          <input
            onChange={({ target }) => {
              setEmail(target.value);
            }}
            type="text"
            readOnly="readonly"
            onFocus={(event) => {
              event.target.removeAttribute("readonly");
            }}
            value={email}
            className="border-2 rounded-md outline-none p-2 w-full"
          />
        </div>
        <div>
          <div className="text-xs font-medium mb-1">Password</div>
          <input
            onChange={(e) => {
              setPass(e.target.value);
            }}
            readOnly="readonly"
            type="password"
            value={password}
            onFocus={(event) => {
              event.target.removeAttribute("readonly");
            }}
            className="border-2 rounded-md outline-none p-2 w-full"
          />
          <div className="flex justify-between">
            <div
              onClick={() => {
                setEmail("test@calorie.com");
                setPass("testUser");
              }}
              className="text-xs font-medium text-gray-500 hover:text-red-400 mt-1 cursor-pointer w-fit"
            >
              Try Dummy Credentials!
            </div>
            <div className="text-xs font-medium text-gray-500 hover:text-black mt-1 cursor-pointer w-fit">
              Forgot password?
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            login();
          }}
          className="bg-black text-white p-2 rounded-md"
        >
          Log in
        </button>
      </div>
    </>
  );
};

export default LoginForm;
