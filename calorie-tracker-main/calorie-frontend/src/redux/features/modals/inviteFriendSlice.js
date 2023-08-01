import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};

const inviteFriendSlice = createSlice({
  name: "addFood",
  initialState,
  reducers: {
    openInviteModal: (state) => {
      state.isOpen = true;
    },
    closeInviteModal: (state) => {
      state.isOpen = false;
    },
  },
});

export default inviteFriendSlice.reducer;
export const { openInviteModal, closeInviteModal } = inviteFriendSlice.actions;
