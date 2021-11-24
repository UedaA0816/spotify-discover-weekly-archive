import { NextApiHandler } from "next";
import { SpotifyWebApi } from 'spotify-web-api-ts';

import { withSessionRoute } from "@/lib/withSession";

const status:NextApiHandler = async (req, res) => {
  try {
    switch (req.method) {
      case "GET": {
        console.log("API::GET:/status")
        res.status(200).json({message:"ok"});
        break;
      }
      case "POST": {
        console.log("API::POST:/status")
        res.status(200).json({message:"ok"});
        break;
      }
    
      default:
        res.status(404).end()
        break;
    }
    
  } catch (error) {
    res.status(500).send(error.message)
  }
};

export default withSessionRoute(status);
