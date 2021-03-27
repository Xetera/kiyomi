import { ApolloServer } from "apollo-server-micro";
import makeCors from "micro-cors";
import { schema } from "@/lib/schema";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/db";
import { User } from "@prisma/client";
import { getUserFromToken } from "@/lib/auth";
import { getSession } from "next-auth/client";

type ContextInput = {
  req: NextApiRequest;
  res: NextApiResponse;
};

export const config = {
  api: {
    bodyParser: false,
  },
};

const cors = makeCors();

const apolloServer = new ApolloServer({
  introspection: true,
  playground: true,
  schema,
  async context(ctx: ContextInput) {
    const { req, res } = ctx;
    const auth = req.headers.authorization;

    let user: User | undefined;
    let uploadType: "TOKEN" | "WEBSITE" = "WEBSITE";
    if (auth) {
      user = (await getUserFromToken(auth, prisma)) ?? undefined;
      uploadType = "TOKEN";
      return {
        req,
        res,
        prisma,
        user,
        uploadType,
      };
    }

    const session = await getSession(ctx);

    return {
      req,
      user: session?.user,
      res,
      session,
      prisma,
    };
  },
});

const handler = apolloServer.createHandler({ path: "/api/graphql" });

export default cors((req: NextApiRequest, res: NextApiResponse) => {
  return req.method === "OPTIONS" ? res.end() : handler(req, res);
});
