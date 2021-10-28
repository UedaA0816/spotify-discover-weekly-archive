import React,{useState,useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, useLocation } from "react-router-dom";
import { useSelector } from "../store";


import { loginUser, logoutUser, User } from '../store/user/user'
import { getToken, getUser, parseRedirectSearchParams } from '../spotifyapi';
import useSpotifyAuth from '../api/hooks/spotifyAuth';
import { useGetTokenMutation } from '../api/spotifyAuth';
import { useGetCurrentUserMutation } from '../api/spotify';


function SpotifyCallback(){
  const location = useLocation()
  const dispatch = useDispatch()
  
  const [redirect,setRedirect] = useState("")

  const accessToken = useSelector(state => state.user.accessToken)

  const {isStateMatch,code,setQuerystring} = useSpotifyAuth()

  const [getToken,{isLoading:isLoadingGetToken,isError:isErrorGetToken}] = useGetTokenMutation()
  const [getCurrentUser,{isLoading:isLoadingGetCurrentUser,isError:isErrorGetCurrentUser}] = useGetCurrentUserMutation()

  useEffect(()=>{
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
    }).catch((error)=>{
      console.error(error)
    })
    

  },[code, getToken])

  useEffect(()=>{
    if(!accessToken)return

    getCurrentUser({accessToken})

  },[accessToken, getCurrentUser])

  if(isStateMatch !== null && !isStateMatch)return <Redirect to="/" />

  if(!isLoadingGetToken && isErrorGetToken){
    dispatch(logoutUser())
    return <Redirect to="/" />
  }

  if(!isLoadingGetCurrentUser && isErrorGetCurrentUser){
    dispatch(logoutUser()) 
    return <Redirect to="/" />
  }

  if(isLoadingGetToken && !isErrorGetToken && isLoadingGetCurrentUser && !isErrorGetCurrentUser) return <Redirect to="/" />

  return <div>{redirect}</div>
}

export default SpotifyCallback