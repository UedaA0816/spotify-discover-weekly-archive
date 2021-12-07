import { NextApiHandler, NextApiRequest } from "next";
import { SpotifyWebApi } from 'spotify-web-api-ts';

import { withSessionRoute } from "@/lib/withSession";
import { ArchiveApiResponse } from "@/types/api/user/discoverweekly/archive";
import { withMongo } from "@/lib/db";
import { AutoArchiveHistory } from "@/types/db/autoArchiveHistory";
import { getBeginningOfTheWeekDate, MONGO_DB_COLLECTION_AUTOARCHIVEHISTORY } from "@/lib/common";

const playlistIdRegex = /^\w{22}$/

const archive:NextApiHandler<ArchiveApiResponse> = async (req, res) => {
  console.log(`API::${req.method}:${req.url}`,{query:req.query,body:req.body})
  try {
    switch (req.method) {
      case "POST": {
    
        const {playlistName,playlistId,accessToken} = req.body
    
        if(!playlistName) return res.status(403).json({
          code:"40301",
          message:"playlistName Error",
        });
        const weekDate = getBeginningOfTheWeekDate(new Date())
        const targetPlaylistName:string = (playlistName as string).includes("{date}") ? (playlistName as string).replace("{date}",weekDate) : playlistName
    
        const targetPlaylistId:string = playlistId
    
        if(!playlistIdRegex.test(targetPlaylistId)) return res.status(403).json({
          code:"40302",
          message:"playlistId Error"
        });

        const spotify = new SpotifyWebApi({ accessToken });
        const me = await spotify.users.getMe()
        try {
      
          const discoverweeklyPlaylist = await spotify.playlists.getPlaylistItems(targetPlaylistId)
          const playlist = await spotify.playlists.createPlaylist(me.id,targetPlaylistName)
          const addPlaylist = await spotify.playlists.addItemsToPlaylist(playlist.id,discoverweeklyPlaylist.items.map(v=>v.track.uri))

          const history = {
            userId:me.id,
            playlistName:playlist.name,
            playlistId:playlist.id,
            createdAt:new Date(),
            success:true,
            week:weekDate,
          }
          await withMongo(async (db) => {
            return await db.collection<AutoArchiveHistory>(MONGO_DB_COLLECTION_AUTOARCHIVEHISTORY).insertOne(history)
          })
          console.log(`アーカイブ成功 |${me.id}|${weekDate}|`)
          res.status(200).json({
            code:"200",
            message:"success",
            data:playlist
          });
          
        } catch (error) {
          //TODO DB登録処理
          console.error(`アーカイブ失敗 |${me.id}|${weekDate}|`,error)
          const history = {
            userId:me.id,
            createdAt:new Date(),
            success:false,
            week:weekDate,
          }
          await withMongo(async (db) => {
            return await db.collection<AutoArchiveHistory>(MONGO_DB_COLLECTION_AUTOARCHIVEHISTORY).insertOne(history)
          })
          res.status(500).send({
            code:"500",
            message:error.message,
            error:error
          })
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

export default archive;
