import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../../axios.config";
import { updateUserProfile } from "../auth/authSlice";

const initialState = {
  loading: false,
};

export const uploadFileToS3 = createAsyncThunk(
  "upload/uploadFileToS3",
  async (data, { fulfillWithValue, dispatch }) => {
    const formData = new FormData();
    formData.set("file", data);
    try {
      const result = await api.post("/upload", formData);
      await dispatch(updateUserProfile({ picture: result.data }));
      return fulfillWithValue();
    } catch (error) {
      console.log(error);
    }
  }
);

const uploadSlice = createSlice({
  name: "upload",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(uploadFileToS3.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(uploadFileToS3.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(uploadFileToS3.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default uploadSlice.reducer;
