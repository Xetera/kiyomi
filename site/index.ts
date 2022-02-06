import { createServer } from "http"
import { parse } from "url"
import next from "next"
import { createServices } from "./lib/services"
import { PrismaClient } from "@prisma/client"
import { makeAmqp } from "./lib/amqp"

const dev = process.env.NODE_ENV !== "production"
const app = next({ dev })
const handle = app.getRequestHandler()

async function main() {
  await app.prepare()
  const amqp = makeAmqp()
  const prisma = new PrismaClient()
  const services = createServices(prisma, amqp)
  services.metrics.client.collectDefaultMetrics()
  process.on("SIGINT", () => {
    amqp.gracefulExit()
    prisma.$disconnect()
    app.close()
    process.exit(0)
  })
  createServer(async (req, res) => {
    if (!req.url) {
      console.warn("Got a request with no url?")
      return
    }
    if (req.url === "/metrics") {
      const metrics = await services.metrics.client.register.metrics()
      res.setHeader(
        "content-type",
        services.metrics.client.register.contentType
      )
      res.write(Buffer.from(metrics), (err) => {
        if (err) {
          console.error(err)
        }
        res.end()
      })
      return
    }
    req.services = services
    req.prisma = prisma
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
    const parsedUrl = parse(req.url, true)

    return handle(req, res, parsedUrl)
  }).listen(3000, () => {
    console.log("> Ready on http://localhost:3000")
  })
}

main()
