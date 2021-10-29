import React,{useState,useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, useLocation } from "react-router-dom";
import { useSelector } from "../store";


import { loginUser, logoutUser, User } from '../store/user/user'
import { getToken, getUser, parseRedirectSearchParams } from '../spotifyapi';
import useSpotifyAuth from '../api/hooks/spotifyAuth';
import { useGetTokenMutation } from '../api/spotifyAuth';
import { useGetCurrentUserMutation } from '../api/spotify';
import { GetTokenResponse } from '../type/spotify/auth';
import { SpotifyUserProfile } from '../type/spotify/user';


function SpotifyCallback(){
  const location = useLocation()
  const dispatch = useDispatch()
  
  const [redirect,setRedirect] = useState("")

  const [token, setToken] = useState<GetTokenResponse|null>(null)
  const [profile, setProfile] = useState<SpotifyUserProfile|null>(null)

  const {isStateMatch,code,setQuerystring} = useSpotifyAuth()

  const [getToken,{isLoading:isLoadingGetToken,isError:isErrorGetToken}] = useGetTokenMutation()
  const [getCurrentUser,{isLoading:isLoadingGetCurrentUser,isError:isErrorGetCurrentUser}] = useGetCurrentUserMutation()

  useEffect(()=>{
    console.log("location effect",location)
    //リダイレクトからステート判定
    console.log(location)
    if(location == null) return
    const qs = location.search.replace("?","")
    setRedirect(qs)
    setQuerystring(qs)
    return ()=>{}
  },[location, setQuerystring])

  useEffect(()=>{
    console.log("code effect",code)
    if(code == null) return
    
    getToken({code}).unwrap().then((res)=>{
      console.log(res)
      setToken(res)
    }).catch((error)=>{
      console.error(error)
    })
    

  },[code, getToken])

  useEffect(()=>{
    console.log("profile effect",token)
    if(!token)return

    getCurrentUser({accessToken:token.access_token}).unwrap().then((res)=>{
      console.log(res)
      setProfile(res)
    }).catch((error)=>{
      console.error(error)
    })

  },[token, getCurrentUser])

  useEffect(()=>{
    console.log("login effect",{token,profile})
    if(!token || !profile)return
    const login:User = {
      isLogin:true,
      profile,
      accessToken:token.access_token,
      refreshToken:token.refresh_token,
    }
    dispatch(loginUser(login))
  },[token,profile])

  if(isStateMatch !== null && !isStateMatch)return <Redirect to="/" />

  if(!isLoadingGetToken && isErrorGetToken){
    console.log("getToken error redirect",{isLoadingGetToken,isErrorGetToken})
    dispatch(logoutUser())
    return <Redirect to="/" />
  }

  if(!isLoadingGetCurrentUser && isErrorGetCurrentUser){
    console.log("getCurrentUser error redirect",{isLoadingGetCurrentUser,isErrorGetCurrentUser})
    dispatch(logoutUser()) 
    return <Redirect to="/" />
  }

  if(isLoadingGetToken && !isErrorGetToken && isLoadingGetCurrentUser && !isErrorGetCurrentUser) return <Redirect to="/" />

  return <div>{redirect}</div>
}

export default SpotifyCallback