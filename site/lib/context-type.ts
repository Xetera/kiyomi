import type { PrismaClient, User } from "@prisma/client"
import { Services } from "./services"

export interface Context extends Services {
  user?: User
  uploadType: "WEBSITE" | "TOKEN"
}
