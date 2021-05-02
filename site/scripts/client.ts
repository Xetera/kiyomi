import { getSdk } from "../__generated__/request";
import { GraphQLClient } from "graphql-request";

if (!process.env.URL) {
  throw Error("URL variable missing");
}

export const client = new GraphQLClient(`${process.env.URL}/api/internal`);

export const sdk = getSdk(client)