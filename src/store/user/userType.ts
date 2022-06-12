export interface IUser {
  token:string,
  lastLoginTime:string,
  lastLoginIp:string,
  username:string,
  introduce:string,
  socialIds:Record<string,string>[],
  url:string,
  mail:string,
  avatar:string,
  expiresIn:string,
  id:string,
}
