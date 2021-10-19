import { useSelector } from "../store";

function Header(){
  const {isLogin,name}  = useSelector(state => state.user);
  return(
    <header className=" flex items-center border-b border-gray-600 h-14 p-2">
      <div className="flex-grow text-lg font-bold whitespace-nowrap overflow-scroll">
        Spotify Discover Weekly Archive 
        {isLogin && <span className="ml-4">ID:{name}</span>}
      </div>
      <div className="flex-shrink-0">
        { isLogin ? <>logout</> : <>login</>}
      </div>
    </header>
  )
}

export default Header
