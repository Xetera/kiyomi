import { NextApiHandler } from "next"

const handler: NextApiHandler = async (req, res) => {
  try {
    await req.services.search.fullPersonRefresh()
    res.status(200).send("Refreshed people")
  } catch (err) {
    console.error(err)
    if (err instanceof Error) {
      return res.status(500).json({ message: err.message })
    }
  }
}

export default handler
