import { PrismaClient, User } from "@prisma/client"
import { randomBytes } from "crypto"
import { Context } from "@/lib/context-type"
import { GetServerSidePropsResult } from "next"

const TOKEN_PREFIX = "KIYOMI_"

export function generateUserToken() {
  const token = randomBytes(32).toString("hex")
  return TOKEN_PREFIX + token
}

export function getUserFromToken(
  token: string,
  db: PrismaClient
): Promise<User | null> {
  if (!token.startsWith(TOKEN_PREFIX)) {
    throw new Error("malformed token")
  }
  return db.user.findUnique({ where: { token } })
}

export const GraphqlAuth = {
  isLoggedIn(_: any, __: any, { user }: Context) {
    return Boolean(user)
  },
}

export const withAuthorizedUser = async (
  f: (user: User) => Promise<GetServerSidePropsResult>
): Promise<GetServerSidePropsResult> => {}
