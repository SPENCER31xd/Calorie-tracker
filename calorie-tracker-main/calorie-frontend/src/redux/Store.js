import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import AddFoodModalReducer from "../redux/features/modals/addFoodSlice";
import InviteFriendModalReducer from "../redux/features/modals/inviteFriendSlice";
import AuthReducer from "../redux/features/auth/authSlice";
import FoodReducer from "../redux/features/food/foodSlice";
import AdminReducer from "../redux/features/admin/adminSlice";
import UploadReducer from "../redux/features/upload/uploadSlice";

export const store = configureStore({
  reducer: {
    foodModal: AddFoodModalReducer,
    inviteModal: InviteFriendModalReducer,
    auth: AuthReducer,
    food: FoodReducer,
    adminData: AdminReducer,
    upload: UploadReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
