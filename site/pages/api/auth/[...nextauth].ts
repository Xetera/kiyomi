import NextAuth, {NextAuthOptions} from "next-auth"
import {User as DatabaseUser} from "@prisma/client"
import Providers from "next-auth/providers"
import Adapters from "next-auth/adapters"
import {prisma} from "@/lib/db"
import {NextApiRequest, NextApiResponse} from "next"
import {generateUserToken} from "@/lib/auth"
import {Role} from "@/lib/permissions"
import jwt from "jsonwebtoken"
import {add, getUnixTime} from "date-fns";
import {JWT} from "next-auth/jwt";

if (!process.env.JWT_SECRET) {
  throw new Error("Missing JWT_SECRET")
}

type Token = {
  name: string;
  sub: string,
  email: string;
  picture: string;
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
      algorithms: ["HS256"]
    },
    // encode: async (params) => {
    //   if (!params?.token) throw Error('no paramas')
    //   console.log({ params })
    //   const {secret, maxAge} = params
    //   const token = params.token as Token
    //   console.log({ token })
    //   const jwtClaims: JWT = {
    //     sub: token.sub,
    //     name: token.name,
    //     email: token.email,
    //     picture: token.picture,
    //     iat: getUnixTime(new Date()),
    //     exp: getUnixTime(add(new Date(), { seconds: maxAge })),
    //   };
    //   const encodedToken = jwt.sign(jwtClaims, secret);
    //   console.log({ encodedToken })
    //   return encodedToken;
    // }
    // async decode(params) {
    //   if (!params?.token) throw Error("invalid token")
    //   return jwt.verify(params?.token!, params.secret)
    // }
  },
  // database: process.env.DATABASE_URL,
  callbacks: {
    session: (session, user: DatabaseUser) => {
      // @ts-ignore
      session.user.id = user.id
      // @ts-ignore
      session.user.createdAt = user.createdAt
      return Promise.resolve({
        ...session,
        id: user.id,
      })
    },
  },
  events: {
    async createUser(user: DatabaseUser) {
      // TODO: this fires 2 save requests per sign up
      // should just add a token while creating the user but
      // idk how lol
      console.log(`User signed up ${user.name}`)
      const token = generateUserToken()
      const _updatedUser = await prisma.user.update({
        where: {id: user.id},
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
  debug: true
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  return NextAuth(req, res, options)
}
