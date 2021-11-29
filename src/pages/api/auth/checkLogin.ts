import axios from "axios";
import { NextApiHandler } from "next";
import { withSessionRoute } from "@/lib/withSession";
import { SpotifyWebApi } from "spotify-web-api-ts";
import { CheckLoginApiResponse } from "@/types/api/auth/checkLogin";


const checkLogin: NextApiHandler<CheckLoginApiResponse> = async (req, res) => {
  console.log(`API::${req.method}:${req.url}`,{query:req.query,body:req.body})
  try {
    const {accessToken,refreshToken} = req.session.user || {}
    if(!accessToken || !refreshToken) return res.status(401).json({
      code:"40101",
      message:"session token Error",
      data:{}
    });
    try {
      const spotify = new SpotifyWebApi({ accessToken });
      await spotify.users.getMe()
      res.status(200).json({
        code:"200",
        message:"success",
        data:{}
      })
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
          res.json({
            code:"200",
            message:"accessToken refreshed",
            data:{}
          });
        } catch (error) {
          await req.session.destroy()
          res.status(401)
          res.json({
            code:"40102",
            message: 'unauthorized',
            data:{},
            error:error
          });
        }
      }else{
        await req.session.destroy()
        res.status(401)
        res.json({ 
          code:"40102",
          message: 'unauthorized',
          data:{},
          error:"refreshToken not found"
         });
      }
    }    
  } catch (error) {
    console.error(error)
    res.status(500).send({
      code:"500",
      message:error.message,
      error:error
    })
  }
};

export default withSessionRoute(checkLogin);
