import { prisma } from "./db"
import { Prisma, PrismaClient } from "@prisma/client"

export type SimilarImage = {
  type: "image" | "discovered"
  id: number
  distance: /* float */ number
}

export const similarImagesQuery = async (
  hash: Uint8Array,
  limit = 5
): Promise<SimilarImage[]> => {
  const data: SimilarImage[] = await prisma.$queryRaw`${Prisma.raw(`
    SELECT
      'image' as type,
      id,
      p_hash_2 <-> CUBE(ARRAY[${hash.join(",")}]) as distance
    FROM images
    UNION
    SELECT
      'discovered' as type,
      id,
      p_hash <-> CUBE(ARRAY[${hash.join(",")}]) as distance
    FROM discovered_images
    ORDER BY distance asc nulls last
    LIMIT ${limit}
  `)}`
  return data
}
