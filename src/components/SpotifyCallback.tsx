import React,{useState,useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, useLocation } from "react-router-dom";


import { loginUser, User } from '../store/user/user'
import { getToken, getUser, parseRedirectSearchParams } from '../spotifyapi';
import useSpotifyAuth from '../api/hooks/spotifyAuth';
import { useGetTokenMutation } from '../api/spotifyAuth';


function SpotifyCallback(){
  const location = useLocation()
  const dispatch = useDispatch()
  
  const [redirect,setRedirect] = useState("")

  const {isStateMatch,code,setQuerystring} = useSpotifyAuth()

  const [getToken,{isLoading,isError}] = useGetTokenMutation()

  useEffect(()=>{
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

  





  if(isStateMatch !== null && !isStateMatch)return <Redirect to="/" />

  if(!isLoading && isError) return <Redirect to="/" />


  return <div>{redirect}</div>
}

export default SpotifyCallback