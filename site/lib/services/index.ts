import { JiuService, makeJiu } from "./jiu"
import { AmqpService } from "../amqp"
import { DiscoveryService, makeDiscovery } from "./discovery"
import { PrismaClient } from "@prisma/client"
import { makeXp, XpService } from "./xp"
import { makeWendy, WendyService } from "./wendy"

export type Services = {
  prisma: PrismaClient
  amqp: AmqpService
  jiu: JiuService
  discovery: DiscoveryService
  xp: XpService
  wendy: WendyService
}

export function getServices(prisma: PrismaClient, amqp: AmqpService): Services {
  const wendy = makeWendy({ prisma, amqp })
  const jiu = makeJiu({ amqp, prisma, wendy })
  const discovery = makeDiscovery({ prisma })
  const xp = makeXp({ prisma })
  return {
    prisma,
    wendy,
    discovery,
    jiu,
    amqp,
    xp,
  }
}
