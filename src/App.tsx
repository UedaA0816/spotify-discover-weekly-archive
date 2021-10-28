import React,{useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { initUser } from './store/user/user'

import Main from './components/Main';
import SpotifyCallback from './components/SpotifyCallback';
import RedirectRoot from './components/RedirectRoot';

function App() {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(initUser())
  },[dispatch])
  return (
    <div className="bg-gray-900 text-white h-screen">

      <BrowserRouter basename={process.env.PUBLIC_URL}>

        <Switch>

          <Route exact path="/" component={Main} />
          <Route exact path="/authorize" component={SpotifyCallback} />
          <Route component={RedirectRoot}/>

        </Switch>

      </BrowserRouter>
    </div>
  );
}

export default App;
