import axios from "axios";
import { NextApiHandler } from "next";
import { withSessionRoute } from "@/lib/withSession";
import { AuthorizeApiResponse, SpotifyAuthorizeApiResponse } from "@/types/api/auth/authorize";



const authorize: NextApiHandler<AuthorizeApiResponse> = async (req, res) => {
  console.log(`API::${req.method}:${req.url}`,{query:req.query,body:req.body})
  try {
    
    const { code, state } = req.query;
  
    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('code', code as string);
    params.append('redirect_uri', process.env.SPOTIFY_API_REDIRECT_URI);
  
    const response = await axios.post<SpotifyAuthorizeApiResponse>(
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
  
    res.status(200).redirect(`/?login=${state}`);
    
  } catch (error) {
    console.error(error)
    res.status(500).send({
      code:"500",
      message:error.message,
      error:error
    })
  }
};

export default withSessionRoute(authorize);
