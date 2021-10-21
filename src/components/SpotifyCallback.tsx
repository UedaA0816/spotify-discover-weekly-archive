import React,{useState,useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, useLocation } from "react-router-dom";


import { loginUser, User } from '../store/user/user'
import { getToken, getUser, parseRedirectSearchParams } from '../spotifyapi';


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

      getToken(code).then((token_res)=>{
        const {access_token , refresh_token} = token_res.data

        return getUser(access_token).then((user_res)=>{
          const profile = user_res.data
          const user:User = {
            profile,
            accessToken:access_token,
            refreshToken:refresh_token,
            isLogin:true
          }
          setIsLoading(false)
          dispatch(loginUser(user))
        })

      }).catch((error)=>{
        console.error(error)
        setIsLoading(false)
      })
      
    }

    return ()=>{

    }
  },[ dispatch, location, setIsLoading])
  return isLoading ? <div>{redirect}</div>: <Redirect to="/" />
}

export default SpotifyCallback