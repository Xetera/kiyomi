import "next-auth"
import type { Role } from "./lib/permissions"

declare module "next-auth/jwt" {
  interface DefaultJWT {
    roles: Role[]
  }
}

declare module "next-auth" {
  interface User {
    id: number
    roles: Role[]
  }

  interface Session {
    user: User
  }
}
