import { celeryClient } from "../amqp"
import { PERCEPTUAL_HASH_TASK_NAME } from "../../../shared/messageQueue"
import { SimilarImage, similarImagesQuery } from "../db-queries"
import chunk from "lodash/chunk"

export const getPerceptualHash = celeryClient.createTask(
  PERCEPTUAL_HASH_TASK_NAME
)

export function makePerceptualHash() {
  const methods = {
    hashStringToCube(hash: string): Uint8Array {
      // A14F4D8 -> [A1, F4, D8]
      const bytes = chunk(hash.split(""), 2)
      return Uint8Array.from(bytes, ([f, s]) => {
        const byte = (f as string) + (s as string)
        return parseInt(byte, 16)
      })
    },
    async mostSimilarImage(url: string): Promise<SimilarImage | undefined> {
      const hash: string = await getPerceptualHash.applyAsync([url]).get(6000)
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
