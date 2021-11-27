import type { PrismaClient, User } from "@prisma/client"
import amqp from "amqplib"
import { Services } from "./services"

export interface Context extends Services {
  prisma: PrismaClient
  // could be null due to connection errors
  amqp?: amqp.Connection
  user?: User
  uploadType: "WEBSITE" | "TOKEN"
}
