import { getServices } from "../../lib/services"

export default async (_req, res) => {
  getServices()
  res.status(200).end()
}
