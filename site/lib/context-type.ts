import type { PrismaClient, User, Role } from "@prisma/client"
import { Services } from "./services"

export interface Context extends Services {
  user?: User & { roles: Role[] }
  uploadType: "WEBSITE" | "TOKEN"
}
