import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "@/lib/db"
import { rawUrl } from "@/lib/services/image"
import fetch from "node-fetch"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { slug, discoveredImageId } = req.query
  if (!slug && !discoveredImageId) {
    return res.status(400).end()
  }
  let imageUrl: string
  if (discoveredImageId) {
    const id = Number(discoveredImageId)
    const image = await prisma.discoveredImage.findUnique({
      where: { id },
    })
    if (!image) {
      return res.status(400).end()
    }
    imageUrl = image.url
  } else {
    const image = await prisma.image.findUnique({
      where: {
        slug: slug as string,
      },
    })
    if (!image) {
      return res.status(400).end()
    }
    imageUrl = rawUrl(image)
  }
  res.setHeader("Content-Disposition", `attachment;`)
  const imageBytes = await fetch(imageUrl)
  if (!imageBytes.body) {
    return res.status(500).end()
  }
  imageBytes.body.pipe(res)
}
