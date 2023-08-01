import React, { useState } from "react";
import { api } from "../../axios.config";
import { toast } from "react-hot-toast";
import delay from "../../redux/features/modals/delay";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import ErrorToaster from "../../shared/ErrorToaster";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const createUser = async () => {
    try {
      await api
        .post("/createUser", {
          name,
          email,
          password,
        })
        .then(() => {
          toast.success("Profile Created!", {
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
        });
      setLoading(true);
      await delay(3000);
      setLoading(false);
      navigate("/login");
    } catch (error) {
      ErrorToaster()
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <div>
          <div className="text-xs font-medium mb-1">Full name</div>
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="border-2 rounded-md outline-none p-2 w-full"
          />
        </div>
        <div>
          <div className="text-xs font-medium mb-1">Email-ID</div>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            className="border-2 rounded-md outline-none p-2 w-full"
          />
        </div>
        <div>
          <div className="text-xs font-medium mb-1">Password</div>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="text"
            className="border-2 rounded-md outline-none p-2 w-full"
          />
        </div>
        <button
          onClick={() => {
            createUser();
          }}
          className="bg-black text-white p-2 rounded-md"
        >
          Register
        </button>
      </div>
      {loading && <Loader />}
    </>
  );
};

export default RegisterForm;
