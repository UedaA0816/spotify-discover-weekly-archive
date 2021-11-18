import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type ArchiveParam = {
  playlistIdUrl?: string;
  playlistId?: string;
  playlistName: string;
}

// Define a service using a base URL and expected endpoints
export const spotifyApi = createApi({
  reducerPath: 'spotifyApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  endpoints: (builder) => ({
    checkLogin: builder.query<{}, void>({
      query: () => `auth/checkLogin`,
    }),
    discoverweeklyArchive: builder.mutation<{}, ArchiveParam>({
      query: (param) => ({
        url:`/user/discoverweekly/archive`,
        method:"POST",
        body:param
      })
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useCheckLoginQuery, useDiscoverweeklyArchiveMutation } = spotifyApi