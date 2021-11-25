import { celeryClient } from "../amqp"
import { PERCEPTUAL_HASH_TASK_NAME } from "../../../shared/messageQueue"
import { SimilarImage, similarImagesQuery } from "../db-queries"

export const getPerceptualHash = celeryClient.createTask(
  PERCEPTUAL_HASH_TASK_NAME
)

export function hashStringToCube(hash: string): Uint8Array {
  return Uint8Array.from(hash.split(""), (val) => parseInt(val, 16))
}

export async function mostSimilarImage(
  url: string
): Promise<SimilarImage | undefined> {
  const hash: string = await getPerceptualHash.applyAsync([url]).get()
  const cube = hashStringToCube(hash)
  const similar = await similarImagesQuery(cube)
  return similar[0]
}
