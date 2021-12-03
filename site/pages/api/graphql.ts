import { ApolloServer } from "apollo-server-micro"
import makeCors from "micro-cors"
import { schema } from "@/lib/schema"
import { contextResolver } from "@/lib/context"
import { IncomingMessage, ServerResponse } from "http"
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core"

export const config = {
  api: {
    bodyParser: false,
  },
}

const cors = makeCors()

const query = `
# Welcome to Kiyomi's API.
# If you're not familiar with GraphQL, make sure to read up on it
# https://graphql.org/learn

# Otherwise, here's a query for getting 25 images of an idol
# Just hit the run button ->

# You can change the name of the person you're querying in the
# QUERY VARIABLES tab below

query Idol($name: String!) {
  people(where: { name: { equals: $name } }) {
    name
    aliases {
      name
    }
    appearances(take: 25) {
      image {
        id
        url
        mimetype
        fileSize
        width
        height
      }
    }
  }
}
`.trim()

const apolloServer = new ApolloServer({
  introspection: true,
  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground({
      workspaceName: "Kiyomi API",
      tabs: [
        {
          name: "Jiu's Images",
          endpoint: process.env.API_URL!,
          query: query,
          variables: JSON.stringify({ name: "Kim Min-ji" }),
        },
      ],
      settings: {
        "editor.theme": "dark",
        "general.betaUpdates": true,
        "editor.reuseHeaders": true,
        "request.credentials": "include",
      },
    }),
  ],
  context: contextResolver,
  schema,
})

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

let apolloServerHandler: (
  req: IncomingMessage,
  res: ServerResponse
) => Promise<void>

const getApolloServerHandler = async (server: ApolloServer) => {
  if (!apolloServerHandler) {
    apolloServerHandler = server.createHandler({
      path: "/api/graphql",
    })
  }
  return apolloServerHandler
}
