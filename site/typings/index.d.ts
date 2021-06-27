import type { PrismaClient } from "@prisma/client"

declare global {
  import amqplib from "amqplib"
  namespace NodeJS {
    interface Global {
      prisma?: PrismaClient
      amqpPromise: Promise<amqplib.Connection>
    }
  }
}
