import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PrivateUser } from 'spotify-web-api-ts/types/types/SpotifyObjects';

export type UserState = {
  user?:PrivateUser
};

export const initialState: UserState = {};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action:PayloadAction<PrivateUser>) => {
      state.user = action.payload
    },
    deleteUser: (state, action:PayloadAction<void> ) => {
      state.user = undefined 
    },
  },
});

export default userSlice;