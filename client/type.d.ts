export {}

export interface RemixCustomConfig {
  GRAPHQL_API: string
  TYPESENSE_KEY: string
  TYPESENSE_URL: string
}

declare global {
  var ENV: RemixCustomConfig
  interface Window {
    ENV: RemixCustomConfig
  }
  interface globalThis {
    ENV: RemixCustomConfig
  }
  namespace NodeJS {
    interface Global {
      ENV: RemixCustomConfig
    }
  }
}

declare namespace NodeJS {
  interface Global {}
}
