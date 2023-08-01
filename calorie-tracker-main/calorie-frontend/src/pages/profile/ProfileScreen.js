import React, { useEffect, useState } from "react";
import { Edit, Trash } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/loader/Loader";
import { updateUserProfile } from "../../redux/features/auth/authSlice";
import { toast } from "react-hot-toast";
import { uploadFileToS3 } from "../../redux/features/upload/uploadSlice";

const ProfileScreen = () => {
  const { user } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.auth);
  const { loading: uploadLoader } = useSelector((state) => state.upload);
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    picture: "",
    calorie_intake: "",
    monthly_budget: "",
  });
  useEffect(() => {
    setUserDetails({
      name: user.name,
      email: user.email,
      picture: user.picture,
      calorie_intake: user.calorie_intake,
      monthly_budget: user.monthly_budget,
    });
  }, [user]);
  const dispatch = useDispatch();
  return (
    <>
      <div className="flex gap-20">
        <div>
          <img
            className="w-52 h-52 rounded-full object-contain"
            src={
              userDetails.picture
                ? userDetails.picture
                : "https://ionicframework.com/docs/img/demos/avatar.svg"
            }
            alt="profile"
          />
          <div className="flex flex-col gap-2 mt-5 items-center">
            <button
              onClick={() => dispatch(updateUserProfile({ picture: "" }))}
              className="border-2 w-fit rounded-md font-medium px-3 py-1.5 text-xs hover:bg-gray-200 flex items-center gap-1"
            >
              <Trash size={15} />
              Remove photo
            </button>
            <label
              htmlFor="photo"
              className="cursor-pointer border-2 w-fit rounded-md font-medium px-3 py-1.5 text-xs hover:bg-gray-200 flex items-center gap-1"
            >
              <Edit size={15} />
              <input
                type="file"
                for="photo"
                id="photo"
                hidden
                onChange={(e) => dispatch(uploadFileToS3(e.target.files[0]))}
              />
              Upload new photo
            </label>
          </div>
        </div>
        <div className="flex flex-col gap-5 w-80">
          <div>
            <div className="font-medium text-xs">Full name</div>
            <input
              type="text"
              className="border-2 outline-none p-2 mt-1 rounded-md w-full text-gray-500"
              value={userDetails.name}
              onChange={(e) =>
                setUserDetails({ ...userDetails, name: e.target.value })
              }
            />
          </div>
          <div>
            <div className="font-medium text-xs">Email address</div>
            <input
              type="text"
              disabled
              className="border-2 outline-none p-2 mt-1 rounded-md w-full text-gray-500"
              value={userDetails.email}
              onChange={(e) =>
                setUserDetails({ ...userDetails, email: e.target.value })
              }
            />
          </div>
          <div>
            <div className="font-medium text-xs">Daily Calories Intake</div>
            <input
              type="number"
              className="border-2 outline-none p-2 mt-1 rounded-md w-full text-gray-500"
              value={userDetails.calorie_intake}
              onChange={(e) =>
                setUserDetails({
                  ...userDetails,
                  calorie_intake: e.target.value,
                })
              }
            />
          </div>
          <div>
            <div className="font-medium text-xs">Monthly Budget</div>
            <input
              type="number"
              className="border-2 outline-none p-2 mt-1 rounded-md w-full text-gray-500"
              value={userDetails.monthly_budget}
              onChange={(e) =>
                setUserDetails({
                  ...userDetails,
                  monthly_budget: e.target.value,
                })
              }
            />
          </div>
          <button
            onClick={() =>
              dispatch(updateUserProfile(userDetails))
                .unwrap()
                .then(() =>
                  toast.success("Profile updated", {
                    style: {
                      borderRadius: "10px",
                      background: "#333",
                      color: "#fff",
                    },
                  })
                )
            }
            className="w-full p-2 bg-black text-white rounded-lg hover:bg-gray-300 hover:text-black font-medium"
          >
            Update
          </button>
        </div>
      </div>
      {loading && <Loader />}
      {uploadLoader && <Loader />}
    </>
  );
};

export default ProfileScreen;
