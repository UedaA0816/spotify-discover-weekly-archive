import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import Header from './Header';
import Home from './Home';
import Welcome from './Welcome';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useUserState } from '@/ducks/user/selector';
import { PrivateUser } from 'spotify-web-api-ts/types/types/SpotifyObjects';
import { setUser } from '@/ducks/user/actions';
import { MeApiResponse } from '@/types/api/me';

function Main({loginPath}:{loginPath:string}) {
  
  const router = useRouter();
  const { login } = router.query
  const dispatch = useDispatch()
  const user = useUserState();

  useEffect(() => {
    if(login !== undefined){
      const currentState = localStorage.getItem("authorizeState")
      console.log({state:login,storageState:currentState})
      if(currentState !== null && login === currentState){
        //APIカレントユーザ
        axios.get<MeApiResponse>("/api/me").then((res)=>{
          dispatch(setUser(res.data.data))
          router.replace("")
        })
      }else{
        setTimeout(()=>{
          alert("不正なログインです")
        },0)
        axios.post("/api/user/logout").then(()=>{
          router.replace("")
        })
      }
      localStorage.removeItem("authorizeState")
    }
  }, [login])
  
  return (
    <div className="h-screen flex flex-col">
      <Header loginPath={loginPath} />
      <div className="flex-grow px-4 sm:px-8 overflow-y-scroll overflow-x-hidden">
        {user ? <Home /> : <Welcome/>}
      </div>
    </div>
  );
}

export default  Main

