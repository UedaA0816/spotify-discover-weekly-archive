import React,{useState,useEffect} from 'react';
import { useSelector } from '../store/';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch, useHistory } from "react-router-dom";

import { initUser,loginUser,logoutUser } from '../store/user/user'

import Header from './Header';

function Main() {
  
  const {isLogin}  = useSelector(state => state.user);
  
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex-grow p-8">
        {isLogin ? <></> : <></>}
      </div>
    </div>
  );
}

export default  Main