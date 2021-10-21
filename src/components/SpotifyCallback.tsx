import React,{useState,useEffect} from 'react';
import { useSelector } from '../store/';
import { useDispatch } from 'react-redux';
import { Redirect, useHistory, useLocation } from "react-router-dom";

import { initUser,loginUser,logoutUser } from '../store/user/user'
import { parseRedirectSearchParams } from '../spotifyapi';

const sleep = (ms:number)=> new Promise((resolve)=>setTimeout(resolve,ms))

function SpotifyCallback(){
  const location = useLocation()
  const dispatch = useDispatch()
  const [isLoading,setIsLoading] = useState(true)
  const [redirect,setRedirect] = useState("")

  useEffect(()=>{

    console.log(location)
    setRedirect(location.search)
    const {state,code} = parseRedirectSearchParams(location.search.replace("?",""))
    const currentState = localStorage.getItem("authorizeState")
    if(state !== currentState){
      setIsLoading(false)
    }else{
      localStorage.removeItem("authorizeState")
      
      
      sleep(5000).then(()=>{
        setIsLoading(false)
        // dispatch(loginUser({code:""}))
      })
      
    }

    return ()=>{

    }
  },[ dispatch, location, setIsLoading])
  return isLoading ? <div>{redirect}</div>: <Redirect to="/" />
}

export default SpotifyCallback