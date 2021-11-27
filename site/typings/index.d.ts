import type { PrismaClient } from "@prisma/client"
import { Services } from "@/lib/services"

declare global {
  import amqplib from "amqplib"
  namespace NodeJS {
    interface Global {
      prisma?: PrismaClient
      servicesPromise?: Promise<Services>
      amqpPromise: Promise<amqplib.Connection>
    }
  }
}
