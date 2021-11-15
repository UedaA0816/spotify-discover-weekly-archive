
import { deleteUser } from "@/ducks/user/actions";
import { useUserState } from "@/ducks/user/selector";
import { generateRandomString } from "@/lib/common";
import axios from "axios";

import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import Button from "./Button";
import Subbutton from "./SubButton";


function Header({loginPath}:{loginPath:string}){

  const dispatch = useDispatch()
  const user = useUserState();

  const login = () => {
    const state = generateRandomString(16)
    localStorage.setItem("authorizeState",state)
    window.location.href = loginPath + state//TODO;
  }

  const handlerLogin = () => {
    login()
  }
  const handlerLogout = () => {
    axios.post("/api/user/logout").then(()=>{
      dispatch(deleteUser())
    })
  }
  return(
    <header className=" flex items-center border-b border-gray-600 h-14 p-2">
      <div className="flex-grow text-lg font-bold whitespace-nowrap overflow-scroll">
        Spotify Discover Weekly Archive 
        {user && <span className="ml-4">ID:{user?.display_name}</span>}
      </div>
      <div className="flex-shrink-0">
        { user ? <Subbutton onClick={handlerLogout}>LOG OUT</Subbutton> : <Button onClick={handlerLogin}>LOG IN</Button>}
      </div>
    </header>
  )
}

export default Header
