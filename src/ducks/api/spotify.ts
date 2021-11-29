import { CheckLoginApiResponse } from '@/types/api/auth/checkLogin'
import { ArchiveApiResponse } from '@/types/api/user/discoverweekly/archive'
import { AutoArchiveApiResponse } from '@/types/api/user/discoverweekly/autoArchive'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Playlist } from 'spotify-web-api-ts/types/types/SpotifyObjects'

type ArchiveParam = {
  playlistIdUrl?: string;
  playlistId?: string;
  playlistName: string;
}

type AutoArchiveParam = {
  playlistIdUrl?: string;
  playlistId?: string;
  playlistName?: string;
  enabled?:boolean;
  isNotRegistered:boolean
}


// Define a service using a base URL and expected endpoints
export const spotifyApi = createApi({
  reducerPath: 'spotifyApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  tagTypes:["AutoArchiveUser"],
  endpoints: (builder) => ({
    checkLogin: builder.query<CheckLoginApiResponse, void>({
      query: () => `auth/checkLogin`,
    }),
    discoverweeklyAutoArchiveUser: builder.query<AutoArchiveApiResponse, void>({
      query: () => ({
        url:`user/discoverweekly/autoArchive`,
        method:"POST",
      }),
      providesTags:(result)=>[{type:"AutoArchiveUser"}]
    }),
    discoverweeklyAutoArchive: builder.mutation<AutoArchiveApiResponse, AutoArchiveParam>({
      query: (param) => ({
        url:`user/discoverweekly/autoArchive`,
        method:"PUT",
        body:param
      }),
      invalidatesTags:()=>[{type:"AutoArchiveUser"}]
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useCheckLoginQuery, useDiscoverweeklyAutoArchiveUserQuery, useDiscoverweeklyAutoArchiveMutation } = spotifyApi