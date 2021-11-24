import axios from "axios";
import { NextApiHandler } from "next";
import { withSessionRoute } from "@/lib/withSession";
import { SpotifyWebApi } from "spotify-web-api-ts";


const checkLogin: NextApiHandler = async (req, res) => {
  try {
    console.log("API::/auth/checkLogin")
    const {accessToken,refreshToken} = req.session.user || {}
    if(!accessToken || !refreshToken) return res.status(401).json({message:"session token Error"});
    try {
      const spotify = new SpotifyWebApi({ accessToken });
      await spotify.users.getMe()
      res.status(200);
      res.json({});
    } catch (error) {
      if(refreshToken){
        try {
          const clientId = process.env.SPOTIFY_API_CLIENT_ID
          const clientSecret = process.env.SPOTIFY_API_CLIENT_SECRET
          const spotify = new SpotifyWebApi({clientId,clientSecret});
          const response = await spotify.getRefreshedAccessToken(refreshToken)
          req.session.user.accessToken = response.access_token
          await req.session.save()
          res.status(200);
          res.json({message:"accessToken refreshed"});
        } catch (error) {
          await req.session.destroy()
          res.status(401)
          res.json({ message: 'unauthorized',error:error });
        }
      }else{
        await req.session.destroy()
        res.status(401)
        res.json({ message: 'unauthorized',error:"refreshToken not found" });
      }
    }    
  } catch (error) {
    res.status(500).send(error.message)
  }
};

export default withSessionRoute(checkLogin);
