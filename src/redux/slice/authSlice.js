//rxslice
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  email: null,
  userName: null,
  userID: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_ACTIVE_USER: (state, action) => {
      //console.log(action.payload);
      const { email, userName, userID } = action.payload;
      state.isLoggedIn = true; //initialState = new state;
      state.email = email;
      state.userName = userName;
      state.userID = userID;
    },
    REMOVE_ACTIVE_USER: (state, action) => {
      state.isLoggedIn = false;
      state.email = null;
      state.userName = null;
      state.userID = null;
      //console.log(state.isLoggedIn)
    },
  },
});

//export actions
export const { SET_ACTIVE_USER, REMOVE_ACTIVE_USER } = authSlice.actions;
//export state
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectEmail = (state) => state.auth.email;
export const selectUserName = (state) => state.auth.userName;
export const selectUserID = (state) => state.auth.userID;
//export reducer to store
export default authSlice.reducer;
