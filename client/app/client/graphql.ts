import { GraphQLClient } from "graphql-request"
import { getSdk } from "~/__generated__/graphql"

console.log(process.env.GRAPHQL_API)
const graphqlClient = new GraphQLClient(process.env.GRAPHQL_API!)

export const sdk = getSdk(graphqlClient)
