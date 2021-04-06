import { ApolloServer } from "apollo-server-micro";
import makeCors from "micro-cors";
import { schema } from "@/lib/schema";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/db";
import { getUserFromToken } from "@/lib/auth";
import { getSession } from "next-auth/client";
import { amqpPromise } from "@/lib/amqp";

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
  playground: {
    title: "Simp.pics API",
    codeTheme: {},
    // workspaceName: "Simp.pics API",
  },
  schema,
  async context(ctx: ContextInput) {
    const { req, res } = ctx;
    const auth = req.headers.authorization;
    const amqp = await amqpPromise;

    if (auth) {
      const user = (await getUserFromToken(auth, prisma)) ?? undefined;
      return {
        req,
        res,
        amqp,
        prisma,
        user,
        uploadType: "TOKEN",
      };
    }

    const session = await getSession(ctx);

    return {
      req,
      user: session?.user,
      amqp,
      res,
      session,
      uploadType: "WEBSITE",
      prisma,
    };
  },
});

const handler = apolloServer.createHandler({ path: "/api/graphql" });

export default cors((req: NextApiRequest, res: NextApiResponse) => {
  return req.method === "OPTIONS" ? res.end() : handler(req, res);
});
