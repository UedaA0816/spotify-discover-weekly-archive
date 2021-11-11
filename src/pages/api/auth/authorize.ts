import axios from "axios";
import { NextApiHandler } from "next";
import { withSessionRoute } from "@/lib/withSession";

type SpotifyAuthApiResponse = {
  access_token: string,
  token_type: string,
  scope: string,
  expires_in: number,
  refresh_token: string
}

const authorize: NextApiHandler = async (req, res) => {
  try {
    console.log("API::/auth/authorize")
    const { code, state } = req.query;
  
    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('code', code as string);
    params.append('redirect_uri', process.env.SPOTIFY_API_REDIRECT_URI);
  
    const response = await axios.post<SpotifyAuthApiResponse>(
      'https://accounts.spotify.com/api/token',
      params,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${Buffer.from(`${process.env.SPOTIFY_API_CLIENT_ID}:${process.env.SPOTIFY_API_CLIENT_SECRET}`, 'utf-8').toString('base64')}`
        }
      }
    );
  
    req.session.user = {
      accessToken: response.data.access_token,
      refreshToken: response.data.refresh_token
    }
    await req.session.save();
  
    res.status(200).redirect('/?login');
    
  } catch (error) {
    res.status(500).send(error.message)
  }
};

export default withSessionRoute(authorize);
