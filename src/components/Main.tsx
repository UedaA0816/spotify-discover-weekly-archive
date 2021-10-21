import React from 'react';
import { useSelector } from '../store/';

import Header from './Header';
import Home from './Home';
import Welcome from './Welcome';

function Main() {
  
  const {isLogin}  = useSelector(state => state.user);
  
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex-grow p-8">
        {isLogin ? <Home /> : <Welcome/>}
      </div>
    </div>
  );
}

export default  Main