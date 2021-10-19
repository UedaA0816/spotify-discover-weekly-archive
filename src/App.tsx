import React,{useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from './store/';
import { init,login,logout } from './store/user/user'

function App() {
  const dispatch = useDispatch()
  const {isLogin, name}  = useSelector(state => state.user);
  useEffect(()=>{
    dispatch(init())
  },[dispatch])
  return (
    <div>
      <header>header</header>
      <div>
        {isLogin ? name : "not login"}
        <button onClick={()=>dispatch(login({}))}>login</button>
        <button onClick={()=>dispatch(logout())}>logout</button>
      </div>
    </div>
  );
}

export default App;
