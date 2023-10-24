import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: "",
  userId: "",
  email: "",
  role: "",
  isLoadingLogin: false,
  isLoadingUser: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loadingFinishedReducer: (state, action) => {
      // console.log(" action ", action);
      // console.log(" state.isLoadingLogin ", state.isLoadingLogin);
      state[`${action.payload}`] = false;
      // console.log(" state.isLoadingLogin ", state.isLoadingLogin);
    },
    loadUserInfo: (state, action) => {
      // console.log(action?.payload);
      state.isLoadingUser = true;
      state.userName = action?.payload?.user?.userName;
      state.userId = action?.payload?.user?._id;
      state.email = action?.payload?.email;
      state.role = action?.payload?.role;
    },
    logInReducer: (state, action) => {
      localStorage.setItem("token", action?.payload?.token);
      state.isLoadingLogin = true;
      state.userName = action?.payload?.user?.userName;
      state.userId = action?.payload?.user?._id;
      state.email = action?.payload?.email;
      state.role = action?.payload?.role;
    },

    signOutReducer: (state, action) => {
      localStorage.removeItem("token");
      state.userName = "";
      state.userId = "";
      state.email = "";
      state.role = "";
    },
  },
});

export const {
  logInReducer,
  signOutReducer,
  loadUserInfo,
  loadingFinishedReducer,
} = userSlice.actions;

export default userSlice.reducer;
