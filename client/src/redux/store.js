import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./users/usersSlice";
import chatReducer from "./chats/chatsSlice";
import uploadReducer from "./uploads/uploadsSlice";
import authReducer from "./auth/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    chats: chatReducer,
    uploads: uploadReducer,
  },
});
