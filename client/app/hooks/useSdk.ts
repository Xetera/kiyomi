import { useContext } from "react"
import { GraphqlClientContext } from "~/models/contexts"

export const useSdk = () => {
  return useContext(GraphqlClientContext)
}
