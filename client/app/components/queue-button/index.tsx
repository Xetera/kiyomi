import { Button, useToast } from "@chakra-ui/react"
import { useContext } from "react"
import { GraphqlClientContext } from "~/models/contexts"

type QueueButtonProps = {
  slug: string
}

export default function useQueue({ slug }: QueueButtonProps) {
  const sdk = useContext(GraphqlClientContext)
  const toast = useToast()
  async function addToQueue() {
    try {
      await sdk.addToQueue({ slug })
      toast({
        status: "success",
        title: "Image scanned",
        position: "bottom-right",
      })
    } catch (err) {
      toast({
        status: "error",
        position: "bottom-right",
        title: "Something went wrong",
        description: err instanceof Error ? err.message : "Unknown error",
      })
    }
  }
  return addToQueue
}
