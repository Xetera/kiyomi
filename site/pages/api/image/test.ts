import { NextApiRequest } from "next"

export default async (req: NextApiRequest, res) => {
  const url = req.query.id
  console.log({ url })
  console.log("sending perceptual hash")
  console.log("waiting for celery response...")
  const { phash } = req.services
  const image = await phash.mostSimilarImage(url as string)
  console.log("got perceptual hash")
  console.log({ image })
  res.json({ image })
}
