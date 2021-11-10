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

function Main({loginPath}:{loginPath:string}) {
  
  const router = useRouter();
  const { login } = router.query
  const dispatch = useDispatch()
  const user = useUserState();

  useEffect(() => {
    if(login !== undefined){
      console.log(login)
      //APIカレントユーザ
      axios.get<PrivateUser>("/api/me").then((res)=>{
        console.log(res)
        dispatch(setUser(res.data))
        router.push("")
      })
    }
  }, [login])
  
  return (
    <div className="h-screen flex flex-col">
      <Header loginPath={loginPath} />
      <div className="flex-grow p-8">
        {user ? <Home /> : <Welcome/>}
      </div>
    </div>
  );
}

export default  Main

