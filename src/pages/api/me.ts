import { NextApiHandler } from "next";
import { SpotifyWebApi } from 'spotify-web-api-ts';

import { withSessionRoute } from "@/lib/withSession";

const me:NextApiHandler = async (req, res) => {
  try {
    console.log("API::/me")
    const accessToken = req.session.user.accessToken

    const spotify = new SpotifyWebApi({ accessToken });

    const me = await spotify.users.getMe()

    res.status(200).json(me);
    
  } catch (error) {
    res.status(500).send(error.message)
  }
};

export default withSessionRoute(me);
