import React from 'react';

import Header from './Header';
import Home from './Home';
import Welcome from './Welcome';

function Main({loginPath}:{loginPath:string}) {
  
  const isLogin  = false
  
  return (
    <div className="h-screen flex flex-col">
      <Header loginPath={loginPath} />
      <div className="flex-grow p-8">
        {isLogin ? <Home /> : <Welcome/>}
      </div>
    </div>
  );
}

export default  Main