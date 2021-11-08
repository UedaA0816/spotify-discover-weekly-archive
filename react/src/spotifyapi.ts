import axios from 'axios';
import querystring from 'querystring'
import { SpotifyUserProfile } from './type/spotify/user';

const clientId = process.env.REACT_APP_SPOTIFY_API_CLIENT_ID || ""
const clientSecret = process.env.REACT_APP_SPOTIFY_API_CLIENT_SECRET || ""
const redirect_uri = process.env.REACT_APP_SPOTIFY_API_REDIRECT_URI || ""

const generateRandomString = function(length:number) {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const parseSearchParams = (searchParams:string) => {
  const querys = querystring.parse(searchParams)
  // console.log(querys)
  return querys
}

export const parseRedirectSearchParams = (searchParams:string):{code:string,state:string} => parseSearchParams(searchParams) as any

export const requestAuthorization = () => {
  const scopes = ['user-read-private', 'user-read-email'],
        state = generateRandomString(16);
  const redirectUrl = 'https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: clientId,
      scope: scopes,
      redirect_uri: redirect_uri,
      state: state
    });
  return {redirectUrl,state}
}

type GetTokenResponse = {access_token:string,refresh_token:string}

export const getToken = (code:string)=>{
  
  const data = `grant_type=authorization_code&code=${code}&redirect_uri=${encodeURIComponent(redirect_uri)}`
  return axios.post<GetTokenResponse>("https://accounts.spotify.com/api/token",data,{
    "headers":{
      "Authorization":`Basic ${new Buffer(`${clientId}:${clientSecret}`).toString('base64')}`,
      'Content-Type':'application/x-www-form-urlencoded'
    },
    "responseType":"json",
  })
}

type GetUserResponse = SpotifyUserProfile

export const getUser = (access_token:string)=>{
  return axios.get<GetUserResponse>("https://accounts.spotify.com/v1/me",{
    "headers":{
      "Authorization":`Bearer ${access_token}`,
      "Access-Control-Allow-Origin":"*"
    },
    "responseType":"json"
  })
}

