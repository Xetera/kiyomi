import { ApolloServer } from "apollo-server-micro"
import makeCors from "micro-cors"
import { privateSchema } from "@/lib/schema"
import { contextResolver } from "@/lib/context"
import { IncomingMessage, ServerResponse } from "http"

export const config = {
  api: {
    bodyParser: false,
  },
}

const cors = makeCors()

const apolloServer = new ApolloServer({
  introspection: process.env.NODE_ENV === "development",
  schema: privateSchema,
  context: contextResolver,
})

let apolloServerHandler: (
  req: IncomingMessage,
  res: ServerResponse
) => Promise<void>

const getApolloServerHandler = async (server: ApolloServer) => {
  if (!apolloServerHandler) {
    apolloServerHandler = server.createHandler({
      path: "/api/internal",
    })
  }
  return apolloServerHandler
}

const promise = apolloServer.start()

export default async (req, res) => {
  if (req.method === "OPTIONS") {
    return res.end()
  }
  await promise
  const handler = await getApolloServerHandler(apolloServer)
  return cors((req, res) => {
    return handler(req, res)
  })(req, res)
}
