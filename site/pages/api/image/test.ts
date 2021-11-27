import {
  getPerceptualHash,
  hashStringToCube,
  mostSimilarImage,
} from "@/lib/services/perceptual-hash"
import { Image } from "@prisma/client"
import { prisma } from "@/lib/db"

export default async (req, res) => {
  const url = req.query.id
  console.log({ url })
  console.log("sending perceptual hash")
  console.log("waiting for celery response...")
  const image = await mostSimilarImage(url)
  // const data = await getPerceptualHash.applyAsync([url]).get()
  // console.log("got perceptual hash")
  // console.log({ data })
  // const cube =hashStringToCube(data)
  // console.log({ cube })
  // console.time("test")
  // const result: Image[] = await prisma.$queryRaw(`
  //   SELECT slug, p_hash_2 <-> CUBE(ARRAY[${cube.join(",")}]) as distance FROM images ORDER BY distance asc nulls last LIMIT 10
  // `)
  // console.timeEnd("test")
  // console.log({ result })
  res.json({ image })
}
