
import { useCallback, useEffect, useState } from "react";
import Subbutton from "./SubButton";


function Header({loginPath}:{loginPath:string}){

  const isLogin = false

  const [Id, setId] = useState<string|null>(null)

  const login = useCallback(() => {
    window.location.href = loginPath;
  }, [loginPath]);

  useEffect(() => {
    if(isLogin){
      //id取得処理
      setId("testuser")
    }else{
      setId(null)
    }
    
  }, [isLogin])
  
  const handlerLogin = () => {
    login()
  }
  const handlerLogout = () => {
    
  }
  return(
    <header className=" flex items-center border-b border-gray-600 h-14 p-2">
      <div className="flex-grow text-lg font-bold whitespace-nowrap overflow-scroll">
        Spotify Discover Weekly Archive 
        {isLogin && <span className="ml-4">ID:{Id}</span>}
      </div>
      <div className="flex-shrink-0">
        { isLogin ? <Subbutton onClick={handlerLogout}>LOG OUT</Subbutton> : <Subbutton onClick={handlerLogin}>LOG IN</Subbutton>}
      </div>
    </header>
  )
}

export default Header
