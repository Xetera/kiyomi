import { useAddToQueueMutation } from "@/lib/__generated__/graphql"
import { Button, useToast } from "@chakra-ui/react"

type QueueButtonProps = {
  slug: string
}

export default function useQueue({ slug }: QueueButtonProps) {
  const { mutateAsync } = useAddToQueueMutation()
  const toast = useToast()
  async function addToQueue() {
    try {
      const result = await mutateAsync({ slug })
      toast({
        status: "success",
        title: "Image queued",
        position: "bottom-right",
        description: `There are currently ${result.scanFaces.queueSize} images in queue ahead of this image.`,
      })
    } catch (err) {
      toast({
        status: "error",
        position: "bottom-right",
        title: "Something went wrong",
        description: err.message,
      })
    }
  }
  return addToQueue
}
