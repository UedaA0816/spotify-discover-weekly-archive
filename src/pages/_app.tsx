import "@/styles/globals.css"
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import createStore from '../ducks/createStore';

import {
  persistStore,
} from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

function MyApp({ Component, pageProps }:AppProps) {
  const store = createStore()
  let persistor = persistStore(store)

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  )
}

export default MyApp
