import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";


// それぞれ slice.reducer を default export している前提
import userReducer from "./user/user";
import { TypedUseSelectorHook, useSelector as rawUseSelector, } from "react-redux";

const reducer = combineReducers({
  user: userReducer,
});

const store = configureStore({ reducer });

export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector;