import { NextApiHandler, NextApiRequest } from "next";
import { SpotifyWebApi } from 'spotify-web-api-ts';

import { withSessionRoute } from "@/lib/withSession";
import { ArchiveApiResponse } from "@/types/api/user/discoverweekly/archive";
import { withMongo } from "@/lib/db";
import { generateRandomString, getBeginningOfTheWeekDate, MONGO_DB_COLLECTION_AUTOARCHIVE, MONGO_DB_COLLECTION_AUTOARCHIVEHISTORY } from "@/lib/common";
import { AutoArchiveUser } from "@/types/db/autoArchive";
import { AutoArchiveApiResponse } from "@/types/api/user/discoverweekly/autoArchive";
import { WithId } from "mongodb";
import axios from "axios";
import { AutoArchiveHistory } from "@/types/db/autoArchiveHistory";


const autoArchiveBatch:NextApiHandler = async (req, res) => {
  console.log(`API::${req.method}:${req.url}`,{query:req.query,body:req.body})
  try {
    switch (req.method) {
      case "POST": {
    
        const {commonKey} = req.body
        const currentCommonKey = process.env.API_BATCH_COMMONKEY
  
        if(!(commonKey && currentCommonKey && commonKey === currentCommonKey)) return res.status(401).json({
          code:"40100",
          message:"CommonKey Error"
        });

        setTimeout(async ()=>{
          const clientId = process.env.SPOTIFY_API_CLIENT_ID
          const clientSecret = process.env.SPOTIFY_API_CLIENT_SECRET

          const pageSize = 100
          let pageNum = 0

          let hasNext = false

          const week = getBeginningOfTheWeekDate(new Date())

          do {
            
            const autoArchiveUsers = await withMongo(async (db) => {
              return await db.collection<AutoArchiveUser>(MONGO_DB_COLLECTION_AUTOARCHIVE).find({"enabled":true}).limit(pageSize).skip(pageSize*pageNum).toArray()
            })
            hasNext = (autoArchiveUsers.length === pageSize)
            
            const spotify = new SpotifyWebApi({clientId,clientSecret});
  
            for await (const user of autoArchiveUsers) {
              const {userId} = user
              try {

                const existHistory = await withMongo(async (db) => {
                  return await db.collection<AutoArchiveHistory>(MONGO_DB_COLLECTION_AUTOARCHIVEHISTORY).findOne({userId,week})
                })

                if(existHistory) {
                  console.log(`????????????????????? |${userId}|${week}|`)
                  continue
                }
                
                const url = new URL(process.env.SPOTIFY_API_REDIRECT_URI)

                // await new Promise(r=>setTimeout(r,200))
                
                const response = await spotify.getRefreshedAccessToken(user.refreshToken)
                
                const archive = await axios.post<ArchiveApiResponse>(`${url.origin}/api/user/discoverweekly/archive`,{
                  playlistId:user.playlistId,
                  playlistName:user.playlistName,
                  accessToken:response.access_token
                })

                const history = {
                  userId:userId,
                  playlistName:archive.data.data.name,
                  playlistId:archive.data.data.id,
                  createdAt:new Date(),
                  success:true,
                  week:week,
                }
                await withMongo(async (db) => {
                  return await db.collection<AutoArchiveHistory>(MONGO_DB_COLLECTION_AUTOARCHIVEHISTORY).insertOne(history)
                })
                console.log(`????????????????????? |${userId}|${week}|`)

              } catch (error) {
                //TODO DB????????????
                console.error(`????????????????????? |${userId}|${week}|`,error)
                const history = {
                  userId:userId,
                  createdAt:new Date(),
                  success:false,
                  week:week,
                }
                await withMongo(async (db) => {
                  return await db.collection<AutoArchiveHistory>(MONGO_DB_COLLECTION_AUTOARCHIVEHISTORY).insertOne(history)
                })
              }
            }

            pageNum++

            console.log({pageNum,hasNext})

          }while(hasNext)
  
        },0)

        // console.log("!!!!!!!!!!!",new Date())
        // setTimeout(()=>{console.log("!!!!!!!!!!!",new Date())},1000*60*5) //???????????????
        
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
