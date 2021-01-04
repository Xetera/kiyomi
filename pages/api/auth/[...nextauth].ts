import NextAuth, { InitOptions } from "next-auth";
import { User as DatabaseUser } from "@prisma/client";
import Providers from "next-auth/providers";
import Adapters from "next-auth/adapters";
import { prisma } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next-auth/_utils";
import { generateUserToken } from "@/lib/auth";

const options: InitOptions = {
  providers: [
    Providers.Discord({
      clientId: process.env.DISCORD_ID,
      clientSecret: process.env.DISCORD_SECRET,
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
  database: process.env.DATABASE_URL,
  callbacks: {
    session: (session, user: DatabaseUser) => {
      // @ts-ignore
      session.user.id = user.id;
      // @ts-ignore
      session.user.createdAt = user.createdAt;
      return Promise.resolve(session);
    },
  },
  events: {
    async createUser(user: DatabaseUser) {
      // TODO: this fires 2 save requests per sign up
      // should just add a token while creating the user but
      // idk how lol
      console.log(`User signed up ${user.name}`);
      const token = generateUserToken();
      const _updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: { token },
      });
      console.log(`Created new token for user ${user.name}`);
    },
  },
};

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);
