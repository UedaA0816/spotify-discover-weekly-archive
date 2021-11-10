import "@/styles/globals.css"
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import createStore from '../ducks/createStore';

function MyApp({ Component, pageProps }:AppProps) {
  return (
    <Provider store={createStore()}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
