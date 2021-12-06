import { NextApiHandler, NextApiRequest } from "next";
import { SpotifyWebApi } from 'spotify-web-api-ts';

import { withSessionRoute } from "@/lib/withSession";
import { withMongo } from "@/lib/db";
import { generateRandomString, MONGO_DB_COLLECTION_AUTOARCHIVE, MONGO_DB_COLLECTION_AUTOARCHIVEHISTORY } from "@/lib/common";
import { AutoArchiveHistory } from "@/types/db/autoArchiveHistory";
import { HistoryApiResponse } from "@/types/api/user/discoverweekly/history";

const history:NextApiHandler<HistoryApiResponse> = async (req, res) => {
  console.log(`API::${req.method}:${req.url} |${req.session.user?.userId}| `,{query:req.query,body:req.body})
  try {
    switch (req.method) {
      case "POST": {
    
        const {} = req.body
        
        const {accessToken} = req.session.user

        if(!accessToken) return res.status(403).json({
          code:"40300",
          message:"accessToken Error"
        });
        
    
        const spotify = new SpotifyWebApi({ accessToken });
        const me = await spotify.users.getMe()
        
        const autoArchiveUser = await withMongo(async (db) => {
              
          return db.collection<AutoArchiveHistory>(MONGO_DB_COLLECTION_AUTOARCHIVEHISTORY).find({"userId":me.id}).sort({createdAt:-1}).toArray()
        })
        res.status(200).json({
          code:"200",
          message:"success",
          data:{list:autoArchiveUser}
        });
        break;
      }
      default:
        res.status(404).end()
        break;
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

export default withSessionRoute(history);
