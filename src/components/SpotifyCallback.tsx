import React,{useState,useEffect} from 'react';
import { useSelector } from '../store/';
import { useDispatch } from 'react-redux';
import { Redirect, useHistory, useLocation } from "react-router-dom";

import { initUser,loginUser,logoutUser } from '../store/user/user'
import { parseRedirectSearchParams } from '../spotifyapi';



function SpotifyCallback(){
  const location = useLocation()
  console.log("SpotifyCallback")
  const sleep = (ms:number)=> new Promise((resolve)=>setTimeout(resolve,ms))
  const dispatch = useDispatch()
  const [isLoading,setIsLoading] = useState(true)
  const [redirect,setRedirect] = useState("")

  useEffect(()=>{

    console.log(location)
    setRedirect(location.search)
    const {code,state} = parseRedirectSearchParams(location.search.replace("?",""))
    const currentState = ""
    if(state !== currentState){
      setIsLoading(false)
    }else{
      //clear
      
      
      sleep(5000).then(()=>{
        setIsLoading(false)
        // dispatch(loginUser({code:""}))
      })
      
    }

    return ()=>{

    }
  },[dispatch, setIsLoading])
  return isLoading ? <div>{redirect}</div>: <Redirect to="/" />
}

export default SpotifyCallback