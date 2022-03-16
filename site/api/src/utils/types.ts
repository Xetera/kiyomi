import { User as UserModel } from "@prisma/client"

export type UserDetails = {
  username: string
  discriminator: string
  discordId: string
  avatar?: string
  accessToken: string
  refreshToken: string
}

export type Done<T> = (err?: Error, user?: T) => void
