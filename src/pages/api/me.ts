import { NextApiHandler } from "next";
import { SpotifyWebApi } from 'spotify-web-api-ts';

import { withSessionRoute } from "@/lib/withSession";
import { MeApiResponse } from "@/types/api/me";

const me:NextApiHandler<MeApiResponse> = async (req, res) => {
  try {
    switch (req.method) {
      case "GET": {
        console.log("API::/me")
        const accessToken = req.session.user.accessToken

        const spotify = new SpotifyWebApi({ accessToken });

        const me = await spotify.users.getMe()

        res.status(200).json({
          code:"200",
          message:"success",
          data:me
        });
        break;
      }    
      default:
        res.status(404).end()
        break;
    }
    
  } catch (error) {
    res.status(500).send({
      code:"500",
      message:error.message,
      error:error
    })
  }
};

export default withSessionRoute(me);
