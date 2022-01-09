import { NextApiHandler } from "next"

const handler: NextApiHandler = async (req, res) => {
  await req.services.search.fullPersonRefresh()
  res.status(200).send("Refreshed people")
}

export default handler
