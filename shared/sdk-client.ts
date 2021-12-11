import { createClient } from "./backend"

export const client = createClient({
  url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/graphql`,
})
