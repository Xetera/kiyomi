import { ApolloServer } from "apollo-server-micro"
import makeCors from "micro-cors"
import { schema } from "@/lib/schema"
import { NextApiRequest, NextApiResponse } from "next"
import { contextResolver } from "@/lib/context"

export const config = {
  api: {
    bodyParser: false,
  },
}

const cors = makeCors()

const apolloServer = new ApolloServer({
  introspection: true,
  playground: {
    title: "Simp.pics API",
  },
  context: contextResolver,
  schema,
})

const handler = apolloServer.createHandler({ path: "/api/graphql" })

export default cors((req: NextApiRequest, res: NextApiResponse) => {
  return req.method === "OPTIONS" ? res.end() : handler(req, res)
})
