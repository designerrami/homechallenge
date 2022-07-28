import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"; // import slice

export default configureStore({
  reducer: {
    auth: authReducer,
  },
}); // export
