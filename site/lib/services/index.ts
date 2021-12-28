import { JiuService, makeJiu } from "./jiu"
import { AmqpService } from "../amqp"
import { DiscoveryService, makeDiscovery } from "./discovery"
import { PrismaClient } from "@prisma/client"
import { makeXp, XpService } from "./xp"
import { makeWendy, WendyService } from "./wendy"
import { makeUploader, UploaderService } from "./uploader"
import { makeWasabi, WasabiService } from "@/lib/services/wasabi"

export type Services = {
  prisma: PrismaClient
  amqp: AmqpService
  jiu: JiuService
  discovery: DiscoveryService
  xp: XpService
  wendy: WendyService
  uploader: UploaderService
  wasabi: WasabiService
}

export function createServices(
  prisma: PrismaClient,
  amqp: AmqpService
): Services {
  const wendy = makeWendy({ prisma, amqp })
  const wasabi = makeWasabi()

  return {
    prisma,
    amqp,
    wendy,
    wasabi,
    discovery: makeDiscovery({ prisma }),
    jiu: makeJiu({ amqp, prisma, wendy }),
    xp: makeXp({ prisma }),
    uploader: makeUploader({ prisma, wasabi, wendy }),
  }
}
