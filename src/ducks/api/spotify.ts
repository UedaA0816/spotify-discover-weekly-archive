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
}


// Define a service using a base URL and expected endpoints
export const spotifyApi = createApi({
  reducerPath: 'spotifyApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  endpoints: (builder) => ({
    checkLogin: builder.query<CheckLoginApiResponse, void>({
      query: () => `auth/checkLogin`,
    }),
    discoverweeklyArchive: builder.mutation<ArchiveApiResponse, ArchiveParam>({
      query: (param) => ({
        url:`user/discoverweekly/archive`,
        method:"POST",
        body:param
      })
    }),
    discoverweeklyAutoArchive: builder.mutation<AutoArchiveApiResponse, AutoArchiveParam>({
      query: (param) => ({
        url:`user/discoverweekly/autoArchive`,
        method:"PUT",
        body:param
      })
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useCheckLoginQuery, useDiscoverweeklyArchiveMutation, useDiscoverweeklyAutoArchiveMutation } = spotifyApi