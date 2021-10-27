import { useState, useEffect } from 'react';
import { parseRedirectSearchParams } from '../../spotifyapi';

function useSpotifyAuth() {

  const [isStateMatch, setIsStateMatch] = useState<null|boolean>(null);
  const [code, setCode] = useState<null|string>(null);
  const [querystring, setQuerystring] = useState<null|string>(null);

  useEffect(() => {
    if(querystring == null) return
    const {state,code} = parseRedirectSearchParams(querystring)
    const currentState = localStorage.getItem("authorizeState")
    if(state !== currentState){
      setIsStateMatch(false)
    }else{
      setIsStateMatch(true)
      setCode(code)
    }
    return () => {
      
    };
  },[querystring]);

  return {isStateMatch,code,setQuerystring};
}

export default useSpotifyAuth