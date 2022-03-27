declare namespace Express {
  import type { Role } from "@prisma/client"

  declare interface Request {
    // for some reason we have to import User like this lmfao?
    // otherwise it doesn't work
    user?: import("@prisma/client").User & { roles: Role[] }
  }
}
