import { useAddToQueueMutation } from "~/__generated__/graphql"
import { Button, useToast } from "@chakra-ui/react"
import { useQueryClient } from "react-query"

type QueueButtonProps = {
  slug: string
}

export default function useQueue({ slug }: QueueButtonProps) {
  const client = useQueryClient()
  const { mutateAsync } = useAddToQueueMutation()
  const toast = useToast()
  async function addToQueue() {
    try {
      await mutateAsync({ slug })
      await client.invalidateQueries(["OneImage", { slug }])
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
