import { GetStaticProps, InferGetStaticPropsType } from 'next';

import Main from '@/components/Main'

export default function Home({ loginPath }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className="bg-gray-900 text-white h-screen">
      <Main loginPath={loginPath}/>
    </div>
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