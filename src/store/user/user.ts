import { createSlice } from "@reduxjs/toolkit";


type User = {
  name:string,
  accessToken:null|string,
  refreshToken:null|string,
  isLogin:boolean
}

// Stateの初期状態
const initialState:User = {
  name: '',
  accessToken:null,
  refreshToken:null,
  isLogin:false
};

const LOCALSTORAGE_KEY_USER = "user"

// Sliceを生成する
const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    init: () => {
      const userState = localStorage.getItem(LOCALSTORAGE_KEY_USER)
      if(userState == null) return initialState
      const json = JSON.parse(userState)
      return json
    },
    login: (state, action) => {
      const res = {
        name: 'test',
        accessToken:"aaaa",
        refreshToken:"bbbb",
        isLogin:true
      }
      localStorage.setItem(LOCALSTORAGE_KEY_USER,JSON.stringify(res))
      return res
    },
    logout: () => {
      localStorage.removeItem(LOCALSTORAGE_KEY_USER)
      return initialState
    },
    // etc...
  }
});

// Reducerをエクスポートする
export default slice.reducer;

// Action Creatorsをエクスポートする
export const { login, logout } = slice.actions;