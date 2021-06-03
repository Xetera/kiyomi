import { getSdk } from "../__generated__/request"
import { GraphQLClient } from "graphql-request"

export function createSdk(url = process.env.URL) {
  if (!url) {
    throw Error("URL variable missing")
  }

  const client = new GraphQLClient(`${url}/api/internal`)

  return getSdk(client)
}
