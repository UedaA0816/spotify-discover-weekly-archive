import { PrivateUser } from "spotify-web-api-ts/types/types/SpotifyObjects";
import { CommonApiResponse } from "@/types/api/common";

export type AuthorizeApiResponse = CommonApiResponse

export type SpotifyAuthorizeApiResponse = {
  access_token: string,
  token_type: string,
  scope: string,
  expires_in: number,
  refresh_token: string
}