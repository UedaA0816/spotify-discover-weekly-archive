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

const playlistIdRegex = /^\w{22}$/

const getPlaylistIdFromUrl = (url:string):string => {
  const num = url.search(/playlist\//) + 9
  const res = url.slice(num,num+22)
  return res
}

const autoArchive:NextApiHandler<AutoArchiveApiResponse> = async (req, res) => {
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
              
          return db.collection<AutoArchiveUser>(MONGO_DB_COLLECTION_AUTOARCHIVE).findOne({"userId":me.id})
        })
        res.status(200).json({
          code:"200",
          message:"success",
          data:{table:autoArchiveUser}
        });
        break;
      }
      case "PUT": {
    
        const {playlistName,playlistId,playlistIdUrl,enabled} = req.body

        const targetPlaylistName:string = playlistName
        const targetPlaylistId:string = playlistId || (playlistIdUrl && getPlaylistIdFromUrl(playlistIdUrl))
    
        if(targetPlaylistId !== undefined && !playlistIdRegex.test(targetPlaylistId)) return res.status(403).json({
          code:"40302",
          message:"playlistId Error"
        });
        
        const {accessToken,refreshToken} = req.session.user
    
        const spotify = new SpotifyWebApi({ accessToken });
        const me = await spotify.users.getMe()
        
        const autoArchiveUser = await withMongo(async (db) => {
          
          const param = {
            ...(enabled !== undefined ? {enabled} : {}),
            ...(targetPlaylistId ? {playlistId:targetPlaylistId} : {}),
            ...(targetPlaylistName ? {playlistName:targetPlaylistName} : {}),
            refreshToken:refreshToken,
            updatedAt:new Date()
          }
          
          return db.collection<WithId<AutoArchiveUser>>(MONGO_DB_COLLECTION_AUTOARCHIVE).findOneAndUpdate({"userId":me.id},{"$set":param},{"upsert":true,"returnDocument":"after"})
        })
        if(!autoArchiveUser.ok) return res.status(500).json({
          code:"500",
          message:"DB upsert error",
          error:autoArchiveUser.lastErrorObject
        });

        const userId = me.id
        const week = getBeginningOfTheWeekDate(new Date())

        try {

          const existHistory = await withMongo(async (db) => {
            return await db.collection<AutoArchiveHistory>(MONGO_DB_COLLECTION_AUTOARCHIVEHISTORY).findOne({userId,week})
          })
  
          if(existHistory) {
            console.log(`アーカイブ不要 |${userId}|${week}|`)
            res.status(200).json({
              code:"200",
              message:"success",
              data:{
                table: autoArchiveUser.value,
              }
            });
          }else{
            const url = new URL(process.env.SPOTIFY_API_REDIRECT_URI)
            
            const archive = await axios.post<ArchiveApiResponse>(`${url.origin}/api/user/discoverweekly/archive`,{
              playlistId:targetPlaylistId,
              playlistName:targetPlaylistName,
              accessToken
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
            console.log(`アーカイブ成功 |${userId}|${week}|`)
            res.status(200).json({
              code:"200",
              message:"success",
              data:{
                table: autoArchiveUser.value,
                playlist:archive.data.data
              }
            });
          }
          
        } catch (error) {
          //TODO DB登録処理
          console.error(`アーカイブ失敗 |${userId}|${week}|`,error)
          const history = {
            userId:userId,
            createdAt:new Date(),
            success:false,
            week:week,
          }
          await withMongo(async (db) => {
            return await db.collection<AutoArchiveHistory>(MONGO_DB_COLLECTION_AUTOARCHIVEHISTORY).insertOne(history)
          })
          res.status(200).json({
            code:"200",
            message:"success",
            data:{
              table: autoArchiveUser.value,
            }
          });
        }          
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

export default withSessionRoute(autoArchive);
