import React, { useEffect, useState } from "react";
import { X } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import {
  addFoodItem,
  updateFoodItem,
} from "../../../redux/features/food/foodSlice";
import { closeFoodModal } from "../../../redux/features/modals/addFoodSlice";
import { v4 as uuid } from "uuid";
import { updateUserFoodItem } from "../../../redux/features/admin/adminSlice";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";
import moment from "moment";

const AddFood = () => {
  const { isOpen, type, data } = useSelector((state) => state.foodModal);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [foodData, setFoodData] = useState({
    date: "",
    name: "",
    price: "",
    calorie: "",
  });
  const clearForm = () => {
    setFoodData({
      date: "",
      name: "",
      price: "",
      calorie: "",
    });
  };
  useEffect(() => {
    if (data) {
      setFoodData(data);
    }
  }, [data]);
  const handleUpdateClick = () => {
    if (window.location.pathname.match("/admin")) {
      dispatch(
        updateUserFoodItem({ id: searchParams.get("id"), data: foodData })
      )
        .unwrap()
        .then(() => {
          clearForm();
          toast.success("Item updated", {
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
        });
    } else {
      dispatch(updateFoodItem(foodData))
        .unwrap()
        .then(() => {
          clearForm();
          toast.success("Item updated", {
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
        });
    }
  };
  const handleAddClick = () => {
    dispatch(addFoodItem({ ...foodData, _id: uuid() }))
      .unwrap()
      .then(() => {
        clearForm();
        toast.success("Item added", {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      });
  };
  const formik = useFormik({
    initialValues: foodData,
    enableReinitialize: true,
    onSubmit: type === "update" ? handleUpdateClick : handleAddClick,
    validationSchema: Yup.object({
      date: Yup.string().required("Date is a required field"),
      name: Yup.string().required("Name is a required field"),
      price: Yup.string()
        .required("Price is a required field")
        .test(
          "Is positive?",
          "Price must be greater than 0",
          (value) => value > 0
        ),
      calorie: Yup.string()
        .required("Calorie is a required field")
        .test(
          "Is positive?",
          "Calories must be greater than 0",
          (value) => value > 0
        ),
    }),
  });
  return (
    isOpen && (
      <div className="absolute top-0 left-0 w-full h-screen bg-black/50 flex items-center justify-center">
        <div className="bg-white shadow w-1/3 rounded-lg p-5">
          <div className="flex items-center justify-between border-b border-gray-200 py-3">
            <div className="font-medium">
              {type === "update" ? (
                <>Update food details</>
              ) : (
                <>Enter food details</>
              )}
            </div>
            <button
              onClick={() => {
                dispatch(closeFoodModal());
                clearForm();
              }}
            >
              <X size={20} />
            </button>
          </div>
          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div>
                <div className="font-medium">Date/Time</div>
                <input
                  type="date"
                  name="date"
                  value={foodData.date}
                  max={moment().format("YYYY-MM-DD")}
                  onChange={(e) =>
                    setFoodData({ ...foodData, date: e.target.value })
                  }
                  className="border-2 w-full rounded-md p-2 outline-none"
                />
                {formik.touched.date && formik.errors.date && (
                  <div className="text-red-400 text-xs font-medium mt-1">
                    {formik.errors.date}
                  </div>
                )}
              </div>
              <div>
                <div className="font-medium">Food/Product name</div>
                <input
                  type="text"
                  name="name"
                  value={foodData.name}
                  onChange={(e) =>
                    setFoodData({ ...foodData, name: e.target.value })
                  }
                  className="border-2 w-full rounded-md p-2 outline-none"
                />
                {formik.touched.name && formik.errors.name && (
                  <div className="text-red-400 text-xs font-medium mt-1">
                    {formik.errors.name}
                  </div>
                )}
              </div>
              <div>
                <div className="font-medium">Calorie value (kcal)</div>
                <input
                  type="number"
                  min="0"
                  name="calorie"
                  value={foodData.calorie}
                  onChange={(e) =>
                    setFoodData({
                      ...foodData,
                      calorie: parseFloat(e.target.value),
                    })
                  }
                  className="border-2 w-full rounded-md p-2 outline-none"
                />
                {formik.touched.calorie && formik.errors.calorie && (
                  <div className="text-red-400 text-xs font-medium mt-1">
                    {formik.errors.calorie}
                  </div>
                )}
              </div>
              <div>
                <div className="font-medium">Price of the food (₹)</div>
                <input
                  type="number"
                  min="0"
                  name="price"
                  value={foodData.price}
                  onChange={(e) =>
                    setFoodData({
                      ...foodData,
                      price: parseFloat(e.target.value),
                    })
                  }
                  className="border-2 w-full rounded-md p-2 outline-none"
                />
                {formik.touched.price && formik.errors.price && (
                  <div className="text-red-400 text-xs font-medium mt-1">
                    {formik.errors.price}
                  </div>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="bg-black text-white p-2 rounded-lg w-full"
            >
              {type === "update" ? "Update food item" : "Add food item"}
            </button>
          </form>
        </div>
      </div>
    )
  );
};

export default AddFood;
