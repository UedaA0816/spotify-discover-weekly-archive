import React,{useState,useEffect} from 'react';
import { useSelector } from '../store/';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch, useHistory } from "react-router-dom";

import { initUser,loginUser,logoutUser } from '../store/user/user'

function Main() {
  const dispatch = useDispatch()
  const {isLogin, name}  = useSelector(state => state.user);
  const history = useHistory()
  const login = () => {
    history.push("/callback")
  }
  return (
    <div>
      <header>header</header>
      <div>
        {isLogin ? name : "not login"}
        <button onClick={login}>login</button>
        <button onClick={()=>dispatch(logoutUser())}>logout</button>
      </div>
    </div>
  );
}

export default  Main