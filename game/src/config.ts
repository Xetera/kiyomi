// @ts-ignore
import convict from "convict"
import pino from "pino"

export const config = convict({
  env: {
    doc: "The application environment.",
    format: ["production", "development", "test"],
    default: "development",
    env: "NODE_ENV",
  },
  redisHost: {
    doc: "HOST of the shared redis instance",
    default: "localhost",
    env: "REDIS_HOST",
  },
  redisPort: {
    doc: "PORT of the shared redis instance",
    default: 6379,
    env: "REDIS_PORT",
  },
  backendUrl: {
    doc: "The application environment.",
    default: "http://localhost:3000",
    env: "BACKEND_URL",
  },
  userToken: {
    doc: "Token of the user",
    default: "SIMP_12345",
    env: "USER_TOKEN",
  },
  typesenseUrl: {
    env: "TYPESENSE_URL",
    default: "https://search.kiyomi.io",
  },
  typesenseKey: {
    env: "TYPESENSE_KEY",
    default: "_",
  },
})

export const logger = pino({
  prettyPrint: config.get("env") === "development",
})

export const DEFAULT_START_TIMEOUT = 4
export const DEFAULT_ROUND_WAIT_TIME = 7
