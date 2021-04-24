import { ApolloServer } from "apollo-server-micro";
import makeCors from "micro-cors";
import { privateSchema } from "@/lib/schema";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: false,
  },
};

const cors = makeCors();

const apolloServer = new ApolloServer({
  introspection: process.env.NODE_ENV === "development",
  schema: privateSchema,
});

const handler = apolloServer.createHandler({ path: "/api/internal" });

export default cors((req: NextApiRequest, res: NextApiResponse) => {
  return req.method === "OPTIONS" ? res.end() : handler(req, res);
});
