import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { SpotifyUserProfile } from '../type/spotify/user';


export const spotifyApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://accounts.spotify.com/v1/' }),
  endpoints: (builder) => ({
    getCurrentUser: builder.mutation<SpotifyUserProfile, {accessToken:string}>({
      query:({accessToken})=>({
        url:"me",
        method:"GET",
        headers:{
          Authorization:`Bearer ${accessToken}`
        }
      })
    })
  }),
  reducerPath:"spotify"
})

// use + endpointsで設定した名前 + QueryでHooksが作られる
export const { useGetCurrentUserMutation } = spotifyApi