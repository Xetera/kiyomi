/// <reference types="next" />
/// <reference types="next/types/global" />

declare module NodeJS {
  import amqplib from "amqplib"
  interface Global {
    prisma?: PrismaClient
    amqpPromise: Promise<amqplib.Connection>
  }
}
