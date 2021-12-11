import {
  getPerceptualHash,
  hashStringToCube,
  mostSimilarImage,
} from "@/lib/services/perceptual-hash"
import { Image } from "@prisma/client"
import { prisma } from "@/lib/db"
import { NextApiRequest } from "next"
import { getServices } from "@/lib/services"

export default async (req: NextApiRequest, res) => {
  const url = req.query.id
  console.log({ url })
  console.log("sending perceptual hash")
  console.log("waiting for celery response...")
  const { phash } = await getServices()
  const image = await phash.mostSimilarImage(url as string)
  console.log("got perceptual hash")
  console.log({ image })
  res.json({ image })
}
