import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  type: "",
  data: null,
};

const addFoodSlice = createSlice({
  name: "addFood",
  initialState,
  reducers: {
    openFoodModal: (state, action) => {
      state.isOpen = true;
      state.type = action.payload.type;
      state.data = action.payload.data ? action.payload.data : null;
    },
    closeFoodModal: (state) => {
      state.isOpen = false;
      state.type = "";
      state.data = null;
    },
  },
});

export default addFoodSlice.reducer;
export const { openFoodModal, closeFoodModal } = addFoodSlice.actions;
