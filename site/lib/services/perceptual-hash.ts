import { celeryClient } from "../amqp"
import { PERCEPTUAL_HASH_TASK_NAME } from "../../../shared/messageQueue"
import { SimilarImage, similarImagesQuery } from "../db-queries"

export const getPerceptualHash = celeryClient.createTask(
  PERCEPTUAL_HASH_TASK_NAME
)

export function makePerceptualHash() {
  const methods = {
    hashStringToCube(hash: string): Uint8Array {
      return Uint8Array.from(hash.split(""), (val) => parseInt(String(val), 16))
    },
    async mostSimilarImage(url: string): Promise<SimilarImage | undefined> {
      const hash: string = await getPerceptualHash.applyAsync([url]).get()
      const cube = methods.hashStringToCube(hash)
      const similar = await similarImagesQuery(cube)
      return similar[0]
    },
    isNearPerfectMatch(distance: number): boolean {
      return distance <= 5
    },
  }
  return methods
}

export type PerceptualHashService = ReturnType<typeof makePerceptualHash>
