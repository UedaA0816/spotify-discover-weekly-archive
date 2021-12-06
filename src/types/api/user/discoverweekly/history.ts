import { CommonApiResponse } from "@/types/api/common";
import { AutoArchiveUser } from "@/types/db/autoArchive";
import { AutoArchiveHistory } from "@/types/db/autoArchiveHistory";
import { WithId } from "mongodb";
import { Playlist } from "spotify-web-api-ts/types/types/SpotifyObjects";


export type HistoryApiResponse = CommonApiResponse<{
  list:WithId<AutoArchiveHistory>[]
}>