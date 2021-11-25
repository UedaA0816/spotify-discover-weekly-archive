export type CommonApiResponse<T = {}> = {
  code:string,
  message:string,
  data?:T,
  error?:any
}