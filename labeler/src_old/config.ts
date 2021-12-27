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
  amqpUrl: {
    doc: "RabbitMQ connection url",
    default: "amqp://localhost:3333",
    env: "AMQP_URL",
  },
  faceRecognitionQueue: {
    doc: "Face recognition queue name in rabbitMQ",
    default: "labeler-development",
    env: "FACE_RECOGNITION_QUEUE",
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
})

export const logger = pino({
  prettyPrint: config.get("env") === "development",
})
