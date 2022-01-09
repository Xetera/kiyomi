import { NextApiHandler } from "next"

const handler: NextApiHandler = async (req, res) => {
  const a = await req.services.search.fullGroupRefresh()
  console.log(a)
  res.status(200).send("Refreshed groups")
}

export default handler
