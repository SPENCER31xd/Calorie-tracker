import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../axios.config";
import { getUserProfile } from "../auth/authSlice";
import { closeFoodModal } from "../modals/addFoodSlice";

const initialState = {
  loading: false,
  error: "",
  stats: null,
};

export const addFoodItem = createAsyncThunk(
  "food/addFoodItem",
  async (data, { dispatch, fulfillWithValue }) => {
    try {
      await api.post("/food", data);
      await dispatch(getUserProfile());
      await dispatch(getFoodStats());
      dispatch(closeFoodModal());
      return fulfillWithValue();
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteFoodItem = createAsyncThunk(
  "food/deleteFoodItem",
  async (data, { dispatch, fulfillWithValue }) => {
    console.log(data);
    try {
      await api.delete(`/food/${data}`);
      await dispatch(getUserProfile());
      await dispatch(getFoodStats());
      return fulfillWithValue();
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateFoodItem = createAsyncThunk(
  "food/updateFoodItem",
  async (data, { dispatch, fulfillWithValue }) => {
    try {
      await api.put("/food", data);
      await dispatch(getUserProfile());
      await dispatch(getFoodStats());
      dispatch(closeFoodModal());
      return fulfillWithValue();
    } catch (error) {
      console.log(error);
    }
  }
);

export const getFoodStats = createAsyncThunk(
  "food/getFoodStats",
  async (data, { fulfillWithValue }) => {
    try {
      const result = await api.get("/food");
      return fulfillWithValue(result.data);
    } catch (error) {
      console.log(error);
    }
  }
);

export const getDailyProgressStats = createAsyncThunk(
  "food/getDailyProgressStats",
  async (data, { fulfillWithValue }) => {
    try {
      const result = await api.get("/food/daily");
      return fulfillWithValue(result.data);
    } catch (error) {
      console.log(error);
    }
  }
);

export const getMonthlyCostStats = createAsyncThunk(
  "food/getMonthlyCostStats",
  async (data, { fulfillWithValue }) => {
    try {
      const result = await api.get("/food/monthlyCost");
      return fulfillWithValue(result.data);
    } catch (error) {
      console.log(error);
    }
  }
);

const foodSlice = createSlice({
  name: "login",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(addFoodItem.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addFoodItem.fulfilled, (state) => {
      state.loading = false;
      state.error = "";
    });
    builder.addCase(addFoodItem.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(deleteFoodItem.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteFoodItem.fulfilled, (state) => {
      state.loading = false;
      state.error = "";
    });
    builder.addCase(deleteFoodItem.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(updateFoodItem.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateFoodItem.fulfilled, (state) => {
      state.loading = false;
      state.error = "";
    });
    builder.addCase(updateFoodItem.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(getFoodStats.fulfilled, (state, action) => {
      state.stats = action.payload;
    });
  },
});

export default foodSlice.reducer;
