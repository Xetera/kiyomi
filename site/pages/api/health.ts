import { handle } from "@/lib/middleware"

export default handle((_req, res) => {
  res.status(200).end()
})
