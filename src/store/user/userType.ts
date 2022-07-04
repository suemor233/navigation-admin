export interface IUser {
  token: string
  password: string
  lastLoginTime: string
  lastLoginIp: string
  username: string
  introduce: string
  socialIds: Record<string, string>[]
  url: string
  mail: string
  backgroundImage: string
  avatar: string
  expiresIn: string
  id: string
}
