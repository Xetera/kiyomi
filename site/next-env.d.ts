/// <reference types="next" />
/// <reference types="next/types/global" />
import type { PrismaClient } from "@prisma/client"
import { DefaultSession as NextSession } from "next-auth"

declare module NodeJS {
  import amqplib from "amqplib"
  interface Global {
    prisma?: PrismaClient
    amqpPromise: Promise<amqplib.Connection>
  }
}
