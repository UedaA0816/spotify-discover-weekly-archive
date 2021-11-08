import { useDispatch } from "react-redux";
import { useSelector } from "../store";

import { logoutUser } from "../store/user/user";
import { requestAuthorization } from "../spotifyapi";

import Subbutton from "./SubButton";


function Header(){
  const dispatch = useDispatch()
  const {isLogin,profile}  = useSelector(state => state.user);
  const login = () => {
    const {redirectUrl:uri,state} = requestAuthorization()
    localStorage.setItem("authorizeState",state)
    window.location.assign(uri)
  }
  const logout = () => {
    dispatch(logoutUser())
  }
  return(
    <header className=" flex items-center border-b border-gray-600 h-14 p-2">
      <div className="flex-grow text-lg font-bold whitespace-nowrap overflow-scroll">
        Spotify Discover Weekly Archive 
        {isLogin && <span className="ml-4">ID:{profile?.display_name}</span>}
      </div>
      <div className="flex-shrink-0">
        { isLogin ? <Subbutton onClick={logout}>LOG OUT</Subbutton> : <Subbutton onClick={login}>LOG IN</Subbutton>}
      </div>
    </header>
  )
}

export default Header
