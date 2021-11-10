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

const rootReducer = combineReducers({
  user: userSlice.reducer,
});

const preloadedState = () => {
  return { user: userState };
};

export type StoreState = ReturnType<typeof preloadedState>;

export type ReduxStore = Store<StoreState>;

const createStore = () => {
  const persistConfig = {
    key: 'root',
    version: 1,
    storage,
  }
  
  const persistedReducer = persistReducer(persistConfig, rootReducer)
  const middlewareList = [...getDefaultMiddleware(), logger];

  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware)=>(
      [...getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),logger]
    ),
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState: preloadedState(),
  });
};

export default createStore;