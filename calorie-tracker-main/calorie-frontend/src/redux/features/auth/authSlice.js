import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../axios.config";

const initialState = {
  loading: false,
  user: null,
  error: "",
  token: null,
};

export const loginUser = createAsyncThunk(
  "login/loginUser",
  async (data, { fulfillWithValue, dispatch }) => {
    try {
      const result = await api.post("/login", data);
      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${result.data.token}`;
      await dispatch(getUserProfile());
      return fulfillWithValue(result.data.token);
    } catch (error) {
      console.log(error);
    }
  }
);

export const getUserProfile = createAsyncThunk(
  "login/getUserProfile",
  async (data, { fulfillWithValue }) => {
    try {
      const result = await api.get("/user");
      return fulfillWithValue(result.data);
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "login/updateUserProfile",
  async (data, { fulfillWithValue, dispatch }) => {
    try {
      await api.patch("/user", data);
      await dispatch(getUserProfile());
      return fulfillWithValue();
    } catch (error) {
      console.log(error);
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    //login user
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload;
      state.error = "";
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    //get user profile
    builder.addCase(getUserProfile.fulfilled, (state, action) => {
      state.user = action.payload;
    });

    //update user profile
    builder.addCase(updateUserProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateUserProfile.fulfilled, (state) => {
      state.loading = false;
    });
  },
});

export default loginSlice.reducer;
export const { logoutUser } = loginSlice.actions;
