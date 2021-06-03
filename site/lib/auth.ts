import { PrismaClient, User } from "@prisma/client"
import { randomBytes } from "crypto"

const TOKEN_PREFIX = "SIMP_"

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
