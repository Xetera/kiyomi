import type { PrismaClient, User } from "@prisma/client";
import amqp from "amqplib";

export interface Context {
  prisma: PrismaClient;
  amqp: amqp.Connection;
  user?: User;
  uploadType: "WEBSITE" | "USER";
}
