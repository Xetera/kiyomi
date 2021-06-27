import "next-auth"

declare module "next-auth" {
  interface User {
    id: number
  }

  interface Session {
    user: User
  }
}
