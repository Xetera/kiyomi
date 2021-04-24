import { ApolloServer } from "apollo-server-micro";
import makeCors from "micro-cors";
import { schema } from "@/lib/schema";
import { NextApiRequest, NextApiResponse } from "next";

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
  },
  schema,
}); 

const handler = apolloServer.createHandler({ path: "/api/graphql" });

export default cors((req: NextApiRequest, res: NextApiResponse) => {
  return req.method === "OPTIONS" ? res.end() : handler(req, res);
});
