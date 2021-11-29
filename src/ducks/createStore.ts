import { Store, combineReducers } from 'redux';
import logger from 'redux-logger';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import userSlice, { initialState as userState } from './user/slice';
import { spotifyApi } from './api/spotify';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

const rootReducer = combineReducers({
  user: userSlice.reducer,
  [spotifyApi.reducerPath]:spotifyApi.reducer,
});

const preloadedState = () => {
  return { 
    user: userState,
   };
};

export type StoreState = ReturnType<typeof preloadedState>;

export type ReduxStore = Store<StoreState>;

const createStore = () => {
  const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    blacklist:[spotifyApi.reducerPath]
  }
  
  const persistedReducer = persistReducer(persistConfig, rootReducer)

  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware)=>(
      [
        ...getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }),
        ...(process.env.NODE_ENV !== 'production' ? [logger] : []),
        spotifyApi.middleware,
      ]
    ),
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState: preloadedState(),
  });
};

export default createStore;