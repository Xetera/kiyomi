import NextAuth, { NextAuthOptions } from "next-auth"
import Providers from "next-auth/providers"
import Adapters from "next-auth/adapters"
import { prisma } from "@/lib/db"
import { NextApiRequest, NextApiResponse } from "next"
import { generateUserToken } from "@/lib/auth"
import { filterValidRoles, Role } from "@/lib/permissions"
import { JWT } from "next-auth/jwt"

if (!process.env.JWT_SECRET) {
  throw new Error("Missing JWT_SECRET")
}

const options: NextAuthOptions = {
  secret: process.env.JWT_SECRET,
  providers: [
    Providers.Discord({
      clientId: process.env.DISCORD_ID!,
      clientSecret: process.env.DISCORD_SECRET!,
    }),
  ],
  adapter: Adapters.Prisma.Adapter({
    prisma,
    modelMapping: {
      User: "user",
      Account: "account",
      VerificationRequest: "verificationRequest",
      Session: "session",
    },
  }),
  session: {
    jwt: true,
    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    updateAge: 24 * 60 * 60, // 24 hours
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    encryption: false,
    signingKey: process.env.JWT_SIGNING_KEY,
    verificationOptions: {
      algorithms: ["HS256"],
    },
  },
  callbacks: {
    async jwt(token, user) {
      if (!user) {
        return token
      }
      const roles = await prisma.role.findMany({ where: { userId: user.id } })
      token.roles = filterValidRoles(roles.map((role) => role.name))
      return token
    },
    session: (session, user: JWT) => {
      const userId = Number(user.sub)
      session.user.id = userId
      session.user.roles = user.roles
      return Promise.resolve({
        ...session,
        id: userId,
      })
    },
  },
  events: {
    async createUser(user) {
      // TODO: this fires 2 save requests per sign up
      // should just add a token while creating the user but
      // idk how lol
      console.log(`User signed up ${user.name}`)
      const token = generateUserToken()
      const _updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: {
          token,
          roles: {
            create: {
              name: Role.User,
            },
          },
        },
      })
      console.log(`Created new token for user ${user.name}`)
    },
  },
  debug: process.env.NODE_ENV !== "production",
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  return NextAuth(req, res, options)
}
