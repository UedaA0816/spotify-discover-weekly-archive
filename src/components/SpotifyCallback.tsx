import React,{useState,useEffect} from 'react';
import { useSelector } from '../store/';
import { useDispatch } from 'react-redux';
import { Redirect, useHistory, useLocation } from "react-router-dom";


import { initUser,loginUser,logoutUser, User } from '../store/user/user'
import { getToken, parseRedirectSearchParams } from '../spotifyapi';

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
      console.error("state_mismatch")
      setIsLoading(false)
    }else{
      localStorage.removeItem("authorizeState")

      getToken(code).then((res)=>{
        const {access_token , refresh_token} = res.data

        

        const user:User = {
          name:"",
          accessToken:access_token,
          refreshToken:refresh_token,
          isLogin:true
        }
        setIsLoading(false)
        dispatch(loginUser(user))
      })
      
    }

    return ()=>{

    }
  },[ dispatch, location, setIsLoading])
  return isLoading ? <div>{redirect}</div>: <Redirect to="/" />
}

export default SpotifyCallback