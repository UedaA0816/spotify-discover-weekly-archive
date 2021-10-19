import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

// それぞれ slice.reducer を default export している前提
import userReducer from "./user/user";

const reducer = combineReducers({
  user: userReducer,
});

const store = configureStore({ reducer });

export default store;