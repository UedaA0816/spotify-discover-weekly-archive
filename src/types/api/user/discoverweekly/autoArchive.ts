import { CommonApiResponse } from "@/types/api/common";
import { AutoArchiveUser } from "@/types/db/autoArchive";
import { WithId } from "mongodb";
import { Playlist } from "spotify-web-api-ts/types/types/SpotifyObjects";


export type AutoArchiveApiResponse = CommonApiResponse<{
  table:WithId<AutoArchiveUser>,
  playlist?:Playlist
}>