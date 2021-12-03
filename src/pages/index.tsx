import { GetStaticProps, InferGetStaticPropsType } from 'next';

import Main from '@/components/Main'
import { NextSeo } from 'next-seo';

export default function Home({ loginPath }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <NextSeo
        defaultTitle="Spotify Archive"
        titleTemplate="%s | Spotify Archive"
        description="Spotifyにログインすれば、Discover Weeklyを自動で保存し続けることができます。"
        canonical="https://spotify-discoverweekly-archive.herokuapp.com/"
      />
      <div className=" bg-gradient-to-t to-gray-900 via-gray-900 from-black  text-white h-screen">
        <Main loginPath={loginPath}/>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps<{loginPath:string}> = async () => {
  const scopes = ['user-read-email', 'user-read-private', 'playlist-modify-public', 'playlist-modify-private'];
  const params = new URLSearchParams();
  params.append('client_id', process.env.SPOTIFY_API_CLIENT_ID);
  params.append('response_type', 'code');
  params.append('redirect_uri', process.env.SPOTIFY_API_REDIRECT_URI);
  params.append('scope', scopes.join(' '));
  params.append('state', '');//TODO
  return {
    props: { loginPath: `https://accounts.spotify.com/authorize?${params.toString()}` }
  }
};