import { createClient } from "./backend"

if (!process.env.API_AUTHORIZATION && !process.env.NEXT_PUBLIC_BASE_URL) {
  throw Error(`API_AUTHORIZATION or NEXT_PUBLIC_BASE_URL is not defined`)
}

export const backend = createClient({
  url: process.env.API_URL,
  headers: {
    Authorization: `${process.env.API_AUTHORIZATION}`,
  },
})
