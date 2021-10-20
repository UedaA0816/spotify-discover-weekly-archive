import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { useSelector } from "../store";

import { loginUser, logoutUser } from "../store/user/user";
import { requestAuthorization } from "../spotifyapi";

import Subbutton from "./SubButton";


function Header(){
  const dispatch = useDispatch()
  const {isLogin,name}  = useSelector(state => state.user);
  const history = useHistory()
  const login = () => {
    const {redirectUrl:uri,state} = requestAuthorization()
    console.log(uri)
    window.location.assign(uri)
  }
  const logout = () => {
    dispatch(logoutUser())
  }
  return(
    <header className=" flex items-center border-b border-gray-600 h-14 p-2">
      <div className="flex-grow text-lg font-bold whitespace-nowrap overflow-scroll">
        Spotify Discover Weekly Archive 
        {isLogin && <span className="ml-4">ID:{name}</span>}
      </div>
      <div className="flex-shrink-0">
        { isLogin ? <Subbutton onClick={logout}>LOG OUT</Subbutton> : <Subbutton onClick={login}>LOG IN</Subbutton>}
      </div>
    </header>
  )
}

export default Header
