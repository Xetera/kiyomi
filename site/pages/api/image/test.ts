import { NextApiRequest } from "next"

export default async (req: NextApiRequest, res) => {
  const url = req.query.id
  console.log("sending perceptual hash")
  console.log("waiting for celery response...")
  const { wendy } = req.services
  const image = await wendy.mostSimilarImage(url as string)
  console.log("got perceptual hash")
  res.json({ image })
}
