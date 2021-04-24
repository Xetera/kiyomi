import type { PrismaClient, User } from "@prisma/client";
import amqp from "amqplib";

export interface Context {
  prisma: PrismaClient;
  // could be null due to connection errors
  amqp?: amqp.Connection;
  user?: User;
  uploadType: "WEBSITE" | "TOKEN";
}