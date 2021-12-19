import type { PrismaClient } from "@prisma/client"
import type { Services } from "@/lib/services"

declare module "http" {
  export interface IncomingMessage {
    services: Services
    prisma: PrismaClient
  }
}

declare global {
  import amqplib from "amqplib"

  namespace NodeJS {
    interface Global {
      amqpPromise: Promise<amqplib.Connection>
    }
  }
}
