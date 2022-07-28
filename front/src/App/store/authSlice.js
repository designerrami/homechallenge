import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    name: "",
    username: "",
    id: "",
    token: "",
    isAuth:false
  },
  reducers: {
    setAuth: (state, action) => {
      state.name = action.payload.name;
      state.username = action.payload.username;
      state.id = action.payload.id;
      state.token = action.payload.token;
      state.isAuth = action.payload.isAuth;
    },
  },
});

export const { setAuth } = authSlice.actions;

export default authSlice.reducer;
