import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

import { spotifyApi } from '../api/spotify'


// それぞれ slice.reducer を default export している前提
import userReducer from "./user/user";
import { TypedUseSelectorHook, useSelector as rawUseSelector, } from "react-redux";
import { spotifyAuthApi } from "../api/spotifyAuth";

const reducer = combineReducers({
  user: userReducer,
  [spotifyApi.reducerPath]: spotifyApi.reducer,
  [spotifyAuthApi.reducerPath]: spotifyAuthApi.reducer,
});

const store = configureStore({ 
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
    spotifyApi.middleware,
    spotifyAuthApi.middleware
    ),
 });

export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector;