import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { spotifyApi } from "../../api/spotify";
import { spotifyAuthApi } from "../../api/spotifyAuth";
import { GetTokenResponse } from "../../type/spotify/auth";
import { SpotifyUserProfile } from "../../type/spotify/user";


export type User = {
  profile?:SpotifyUserProfile,
  accessToken?:string,
  refreshToken?:string,
  isLogin:boolean
}
const LOCALSTORAGE_KEY_USER = "user"

// Stateの初期状態
const initialState:User = {
  isLogin:false
};
const init: CaseReducer<User, PayloadAction> = (state, action) => {
  const userState = localStorage.getItem(LOCALSTORAGE_KEY_USER)
  if(userState == null) return initialState
  const json = JSON.parse(userState)
  return json
}
const login: CaseReducer<User, PayloadAction<User>> = (state, action) => {
  const res = action.payload
  localStorage.setItem(LOCALSTORAGE_KEY_USER,JSON.stringify(res))
  return res
}
const logout: CaseReducer<User, PayloadAction> = (state, action) => {
  localStorage.removeItem(LOCALSTORAGE_KEY_USER)
  return initialState
}

// Sliceを生成する
const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    init,
    login,
    logout,
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      spotifyAuthApi.endpoints.getToken.matchFulfilled,
      (state, action: PayloadAction<GetTokenResponse>) => {
        state.accessToken = action.payload.access_token;
        state.refreshToken = action.payload.refresh_token;
        state.isLogin = true
      },
    ).addMatcher(
      spotifyApi.endpoints.getCurrentUser.matchFulfilled,
      (state, action: PayloadAction<SpotifyUserProfile>) => {
        state.profile = action.payload;
      },
    );
  },
});

// Reducerをエクスポートする
export default slice.reducer;

// Action Creatorsをエクスポートする
export const { init:initUser, login:loginUser, logout:logoutUser } = slice.actions;