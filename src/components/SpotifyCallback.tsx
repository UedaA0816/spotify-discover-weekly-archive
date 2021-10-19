import React,{useState,useEffect} from 'react';
import { useSelector } from '../store/';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch, useHistory } from "react-router-dom";

import { initUser,loginUser,logoutUser } from '../store/user/user'



function SpotifyCallback(){
  console.log("SpotifyCallback")
  const sleep = (ms:number)=> new Promise((resolve)=>setTimeout(resolve,ms))
  const dispatch = useDispatch()
  const [isLoading,setIsLoading] = useState(true)
  useEffect(()=>{
    sleep(5000).then(()=>{
      setIsLoading(false)
      dispatch(loginUser({}))
    })
    
    return ()=>{

    }
  },[dispatch, setIsLoading])
  return isLoading ? <div>loading</div>: <Redirect to="/" />
}

export default SpotifyCallback