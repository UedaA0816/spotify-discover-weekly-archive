import { NextApiHandler, NextApiRequest } from "next";
import { SpotifyWebApi } from 'spotify-web-api-ts';

import { withSessionRoute } from "@/lib/withSession";
import { ArchiveApiResponse } from "@/types/api/user/discoverweekly/archive";
import { withMongo } from "@/lib/db";
import { generateRandomString, MONGO_DB_COLLECTION_AUTOARCHIVE } from "@/lib/common";
import { AutoArchiveUser } from "@/types/db/autoArchive";
import { AutoArchiveApiResponse } from "@/types/api/user/discoverweekly/autoArchive";
import { WithId } from "mongodb";
import axios from "axios";

const autoArchiveBatch:NextApiHandler = async (req, res) => {
  console.log(`API::${req.method}:${req.url}`,{query:req.query,body:req.body})
  try {
    switch (req.method) {
      case "POST": {
    
        const {} = req.body

        setTimeout(async ()=>{
          const clientId = process.env.SPOTIFY_API_CLIENT_ID
          const clientSecret = process.env.SPOTIFY_API_CLIENT_SECRET

          const pageSize = 100
          let pageNum = 0

          let hasNext = false

          do {
            
            const autoArchiveUsers = await withMongo(async (db) => {
              return await db.collection<AutoArchiveUser>(MONGO_DB_COLLECTION_AUTOARCHIVE).find({"enabled":true}).limit(pageSize).skip(pageSize*pageNum).toArray()
            })
            hasNext = (autoArchiveUsers.length === pageSize)
            
            const spotify = new SpotifyWebApi({clientId,clientSecret});
  
            for await (const user of autoArchiveUsers) {
              try {
                
                const url = new URL(process.env.SPOTIFY_API_REDIRECT_URI)

                // await new Promise(r=>setTimeout(r,200))
                
                const response = await spotify.getRefreshedAccessToken(user.refreshToken)
                
                const archive = await axios.post<ArchiveApiResponse>(`${url.origin}/api/user/discoverweekly/archive`,{
                  playlistId:user.playlistId,
                  playlistName:user.playlistName,
                  accessToken:response.access_token
                })

                //TODO DB登録処理
                console.log("DB登録処理",archive.data.data.href)
                // console.log("DB登録処理",user.userId)
              } catch (error) {
                //TODO DB登録処理
                console.log("DB登録処理失敗",error)
              }
            }

            pageNum++

            console.log({pageNum,hasNext})

          }while(hasNext)
  


        },0)

        // console.log("!!!!!!!!!!!",new Date())
        // setTimeout(()=>{console.log("!!!!!!!!!!!",new Date())},1000*60*5) //５分は動く
        
        res.status(200).json({
          code:"200",
          message:"success",
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

export default autoArchiveBatch;
