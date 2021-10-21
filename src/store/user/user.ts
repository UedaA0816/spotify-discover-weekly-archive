import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";


export type User = {
  name:string,
  accessToken:null|string,
  refreshToken:null|string,
  isLogin:boolean
}
const LOCALSTORAGE_KEY_USER = "user"

// Stateの初期状態
const initialState:User = {
  name: '',
  accessToken:null,
  refreshToken:null,
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
  }
});

// Reducerをエクスポートする
export default slice.reducer;

// Action Creatorsをエクスポートする
export const { init:initUser, login:loginUser, logout:logoutUser } = slice.actions;