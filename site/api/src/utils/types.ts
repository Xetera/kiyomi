import { Account } from "@prisma/client"

export type Done =
  | ((err: Error | null, account: Account | null) => void)
