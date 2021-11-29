import { CommonApiResponse } from "@/types/api/common";
import { Playlist } from "spotify-web-api-ts/types/types/SpotifyObjects";

export type ArchiveApiResponse = CommonApiResponse<Playlist>