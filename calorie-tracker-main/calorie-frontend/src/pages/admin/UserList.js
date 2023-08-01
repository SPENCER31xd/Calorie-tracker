import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const users = ["priyanshu bhardwaj", "dev bhardwaj"];

const UserList = ({ data }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentUserId, setCurrentUserId] = useState(null);
  const changeParams = (id) => {
    setSearchParams({ id });
  };
  useEffect(() => {
    if (searchParams.get("id")) {
      setCurrentUserId(searchParams.get("id"));
    }
  }, [searchParams.get("id")]);
  return (
    <div className="w-1/5 flex flex-col gap-5 border-r pr-3">
      <div className="font-medium">Users List ({data?.length})</div>
      <div className="text-gray-400 font-medium flex flex-col gap-2">
        {data?.map((item) => {
          return (
            <div
              key={item._id}
              className={
                item._id === currentUserId
                  ? "cursor-pointer w-fit text-black flex items-center gap-1"
                  : "cursor-pointer w-fit flex items-center gap-1"
              }
              onClick={() => changeParams(item._id)}
            >
              <img
                src={item.picture}
                alt="profile"
                className="w-7 h-7 object-contain rounded-full border-2"
              />
              {item.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserList;
