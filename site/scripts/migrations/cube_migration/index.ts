import { Prisma, PrismaClient } from "@prisma/client"
import { makeJiu } from "../../../lib/services/jiu"
import fetch from "node-fetch"

export function hashStringToCube(hash: string): Uint8Array {
  return Uint8Array.from(hash.split(""), (val) => parseInt(val, 16))
}

;(async () => {
  const client = new PrismaClient()
  const images: any = await client.$queryRaw`SELECT slug, id, p_hash, p_hash_2 IS NOT NULL as has_phash_2 FROM images`
  for (const image of images.filter((a) => a.p_hash && !a.has_phash_2)) {
    const code = hashStringToCube(image.p_hash)
    const a = await client.$executeRaw`${Prisma.raw(`
      UPDATE images SET p_hash_2 = CUBE(ARRAY[${code.join(
        ","
      )}]) WHERE slug = '${image.slug}' RETURNING id
    `)}`
  }
  console.log("assigning all images phashes")
  for (const image of images.filter((a) => !a.p_hash)) {
    const url = `https://s3.wasabisys.com/img.kiyomi.io/${image.slug}.webp`
    console.log("fetching", image.slug)
    const data = await fetch(url).then((r) => r.arrayBuffer())
    // const phash = await getPerceptualHash
    //   .applyAsync([Buffer.from(data).toString("base64")])
    //   .get()
    // const code = hashStringToCube(phash)
    // const a = await client.$executeRaw`${Prisma.raw(`
    //   UPDATE images SET p_hash_2 = CUBE(ARRAY[${code.join(
    //     ","
    //   )}]) WHERE slug = '${image.slug}' RETURNING id
    // `)}`
  }
})()
