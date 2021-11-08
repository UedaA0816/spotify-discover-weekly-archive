import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { GetTokenResponse } from '../type/spotify/auth'

const clientId = process.env.REACT_APP_SPOTIFY_API_CLIENT_ID || ""
const clientSecret = process.env.REACT_APP_SPOTIFY_API_CLIENT_SECRET || ""
const redirect_uri = process.env.REACT_APP_SPOTIFY_API_REDIRECT_URI || ""


export const spotifyAuthApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://accounts.spotify.com/api/' }),
  endpoints: (builder) => ({
    getToken: builder.mutation<GetTokenResponse, {code:string}>({
      query:({code})=>({
        url:"token",
        method:"POST",
        headers:{
          'Authorization':`Basic ${new Buffer(`${clientId}:${clientSecret}`).toString('base64')}`,
          'Content-Type':'application/x-www-form-urlencoded'
        },
        body: `grant_type=authorization_code&code=${code}&redirect_uri=${encodeURIComponent(redirect_uri)}`
      })
    })
  }),
  reducerPath:"spotifyAuth"
})

// use + endpointsで設定した名前 + QueryでHooksが作られる
export const { useGetTokenMutation } = spotifyAuthApi