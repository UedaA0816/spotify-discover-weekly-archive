import { NextApiHandler, NextApiRequest } from "next";
import { SpotifyWebApi } from 'spotify-web-api-ts';

import { withSessionRoute } from "@/lib/withSession";
import { ArchiveApiResponse } from "@/types/api/user/discoverweekly/archive";

const playlistIdRegex = /^\w{22}$/

const getDate = (date:Date) => {

  const this_year = date.getFullYear()
  const this_month = date.getMonth()
  const this_date = date.getDate()
  const this_day = date.getDay()
  const this_monday = this_date - (this_day === 0 ? this_day+6:this_day-1)
  const WeekStart = new Date(this_year,this_month,this_monday)

  // console.log({this_year,this_month,this_date,this_day,this_monday,WeekStart})

  const fullyear = (d:Date):string => d.getFullYear() + ""
  const month = (d:Date):string => ((d.getMonth() + 1) < 10 ? "0" : "") + (d.getMonth() + 1) 
  const day = (d:Date):string => (d.getDate() < 10 ? "0" : "") + d.getDate() 
  return `${fullyear(WeekStart)}/${month(WeekStart)}/${day(WeekStart)}`
}

const getPlaylistIdFromUrl = (url:string):string => {
  const num = url.search(/playlist\//) + 9
  const res = url.slice(num,num+22)
  return res
}

const archive:NextApiHandler<ArchiveApiResponse> = async (req, res) => {
  console.log(`API::${req.method}:${req.url}`,{query:req.query,body:req.body})
  try {
    switch (req.method) {
      case "POST": {
    
        const {playlistName,playlistId,playlistIdUrl} = req.body
        console.log("API::/user/discoverweekly/archive",{playlistName,playlistId,playlistIdUrl})
    
        if(!playlistName) return res.status(403).json({
          code:"40301",
          message:"playlistName Error",
        });
    
        const targetPlaylistName:string = (playlistName as string).includes("{date}") ? (playlistName as string).replace("{date}",getDate(new Date())) : playlistName
    
        const targetPlaylistId:string = playlistId || getPlaylistIdFromUrl(playlistIdUrl)
    
        if(!playlistIdRegex.test(targetPlaylistId)) return res.status(403).json({
          code:"40302",
          message:"playlistId Error"
        });
        
        const accessToken = req.session.user.accessToken
    
        const spotify = new SpotifyWebApi({ accessToken });
        const me = await spotify.users.getMe()
    
        const discoverweeklyPlaylist = await spotify.playlists.getPlaylistItems(targetPlaylistId)
        const playlist = await spotify.playlists.createPlaylist(me.id,targetPlaylistName)
        const addPlaylist = await spotify.playlists.addItemsToPlaylist(playlist.id,discoverweeklyPlaylist.items.map(v=>v.track.uri))
        res.status(200).json({
          code:"200",
          message:"success",
          data:playlist
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

export default withSessionRoute(archive);
