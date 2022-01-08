import { PrismaClient, User } from "@prisma/client"
import { randomBytes } from "crypto"
import { Context } from "@/lib/context-type"
import { filterValidRoles, hasRole, PermissionsFor, Role } from "./permissions"

const TOKEN_PREFIX = "KIYOMI_"

export function generateUserToken() {
  const token = randomBytes(32).toString("hex")
  return TOKEN_PREFIX + token
}

export function getUserFromToken(token: string, db: PrismaClient) {
  return db.user.findUnique({ where: { token }, include: { roles: true } })
}

export const GraphqlAuth = {
  isLoggedIn(_: any, __: any, { user }: Context) {
    return Boolean(user)
  },
  hasRole(inputRoles: readonly Role[]) {
    return async (_: any, __: any, { user, prisma }: Context) => {
      if (!user) {
        return false
      }
      const roles = await prisma.role.findMany({ where: { userId: user.id } })
      const validRoles = filterValidRoles(roles.map((role) => role.name))
      return inputRoles.every((role) =>
        hasRole(
          // TODO: eh?
          validRoles.map((name) => ({ name })),
          role
        )
      )
    }
  },
}
