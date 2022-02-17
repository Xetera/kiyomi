import { useUserDataQuery } from "~/__generated__/graphql"
import { store } from "@/models/store"
import { useSession } from "next-auth/client"

export const UserData = () => {
  const [session] = useSession()
  useUserDataQuery(
    {},
    {
      refetchInterval: 1000 * 30,
      enabled: Boolean(session),
      onSuccess(data) {
        store.dispatch.user.overrideState(data.me)
      },
    }
  )
  return null
}
