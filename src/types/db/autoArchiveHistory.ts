export type AutoArchiveHistory = {
  userId:string,
  success:boolean,
  week:string,
  playlistName?:string,
  playlistId?:string,
  createdAt:Date,
}