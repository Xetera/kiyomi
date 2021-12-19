import { JiuService, makeJiu } from "./jiu"
import { makePerceptualHash, PerceptualHashService } from "./perceptual-hash"
import { AmqpService } from "../amqp"
import { DiscoveryService, makeDiscovery } from "./discovery"
import { PrismaClient } from "@prisma/client"

export type Services = {
  prisma: PrismaClient
  amqp: AmqpService
  jiu: JiuService
  discovery: DiscoveryService
  phash: PerceptualHashService
}

export function getServices(prisma: PrismaClient, amqp: AmqpService): Services {
  const phash = makePerceptualHash()
  const jiu = makeJiu({ phash, amqp, prisma })
  const discovery = makeDiscovery({ prisma })
  return {
    prisma,
    phash,
    discovery,
    jiu,
    amqp,
  }
}
