import moment from "moment/moment";
import React from "react";
import { XSquare, Edit } from "react-feather";
import { useDispatch } from "react-redux";
import { deleteFoodItem } from "../../redux/features/food/foodSlice";
import { openFoodModal } from "../../redux/features/modals/addFoodSlice";
import { toast } from "react-hot-toast";
import { deleteUserFoodItem } from "../../redux/features/admin/adminSlice";
import { useSearchParams } from "react-router-dom";

const ListItem = ({ item }) => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const handleDelete = (foodId) => {
    if (window.location.pathname.match("/admin")) {
      dispatch(
        deleteUserFoodItem({ uid: searchParams.get("id"), foodId:foodId })
      )
        .unwrap()
        .then(() => {
          toast.success("Item deleted", {
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
        });
    } else {
      dispatch(deleteFoodItem(foodId))
        .unwrap()
        .then(() =>
          toast.success("Item deleted", {
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          })
        );
    }
  };
  return (
    <>
      <tr className="text-gray-800">
        <td className="text-center">{item.name}</td>
        <td className="text-center">
          {moment(item.date).format("DD-MMM-YYYY")}
        </td>
        <td className="text-center">{item.price}</td>
        <td className="text-center">{item.calorie}</td>
        <td className="flex items-center justify-center gap-2">
          <button
            onClick={() =>
              dispatch(openFoodModal({ type: "update", data: item }))
            }
            className="text-gray-500 hover:text-black"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => handleDelete(item._id)}
            className="text-gray-500 hover:text-black"
          >
            <XSquare size={16} />
          </button>
        </td>
      </tr>
    </>
  );
};

export default ListItem;
