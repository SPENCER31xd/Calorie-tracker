import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../../axios.config";
import { getUserProfile } from "../auth/authSlice";
import { getFoodStats } from "../food/foodSlice";
import { closeFoodModal } from "../modals/addFoodSlice";

const initialState = {
  loading: false,
  error: "",
  activeData: null,
};

export const getUserNames = createAsyncThunk(
  "admin/getUserNames",
  async (data, { fulfillWithValue }) => {
    try {
      const result = await api.get("/admin");
      return fulfillWithValue(result.data);
    } catch (error) {
      console.log(error);
    }
  }
);

export const getUserData = createAsyncThunk(
  "admin/getUserData",
  async (data, { fulfillWithValue }) => {
    try {
      const result = await api.get(`/admin/${data}`);
      return fulfillWithValue(result.data);
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateUserFoodItem = createAsyncThunk(
  "admin/updateUserFoodItem",
  async (data, { fulfillWithValue, dispatch, getState }) => {
    try {
      await api.patch(`/admin/${data.id}`, data.data);
      await dispatch(getUserProfile());
      await dispatch(getFoodStats());
      await dispatch(getUserData(data.id));
      dispatch(closeFoodModal());
      return fulfillWithValue();
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteUserFoodItem = createAsyncThunk(
  "admin/deleteUserFoodItem",
  async (data, { fulfillWithValue, dispatch, getState }) => {
    try {
      await api.delete(`/admin/${data.uid}/${data.foodId}`);
      await dispatch(getUserProfile());
      await dispatch(getFoodStats());
      await dispatch(getUserData(getState().adminData.activeId));
      return fulfillWithValue();
    } catch (error) {
      console.log(error);
    }
  }
);

export const getStats = createAsyncThunk(
  "admin/getStats",
  async (data, { fulfillWithValue }) => {
    try {
      const result = await api.get("/admin/stats");
      console.log(result);
      return fulfillWithValue(result.data);
    } catch (error) {
      console.log(error);
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState,
  extraReducers: (builder) => {
    //get user data
    builder.addCase(getUserData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserData.fulfilled, (state, action) => {
      state.activeData = action.payload;
      state.loading = false;
    });
    builder.addCase(getUserData.rejected, (state) => {
      state.loading = false;
    });

    //update user's food item
    builder.addCase(updateUserFoodItem.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateUserFoodItem.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(updateUserFoodItem.rejected, (state) => {
      state.loading = false;
    });

    //delete user's food item
    builder.addCase(deleteUserFoodItem.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteUserFoodItem.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(deleteUserFoodItem.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default adminSlice.reducer;
