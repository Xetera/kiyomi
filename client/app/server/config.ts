import { RemixCustomConfig } from "type"

export const getEnv = (): RemixCustomConfig => ({
  GRAPHQL_API: process.env.GRAPHQL_API!,
  TYPESENSE_KEY: process.env.TYPESENSE_KEY!,
  TYPESENSE_URL: process.env.TYPESENSE_URL!,
  DISCORD_INVITE_URL: process.env.DISCORD_INVITE_URL!,
})
