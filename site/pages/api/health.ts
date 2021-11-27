import { getServices } from "../../lib/services"

export default async (_req, res) => {
  const services = await getServices()
  res.status(200).end()
}
