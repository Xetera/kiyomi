import { AmqpService } from "../amqp"
import { PrismaClient } from "@prisma/client"
import { makeJiu, JiuService } from "./jiu"
import { makeDiscovery, DiscoveryService } from "./discovery"
import { makeXp, XpService } from "./xp"
import { makeWendy, WendyService } from "./wendy"
import { makeUploader, UploaderService } from "./uploader"
import { makeWasabi, WasabiService } from "./wasabi"
import { makeSearch, SearchService } from "./search"
import { makeTag, TagService } from "./tag"
import { makePerson, PersonService } from "@/lib/services/person"
import { makeReport, ReportService } from "@/lib/services/report"
import { makeWebhook, WebhookService } from "@/lib/services/webhook"
import { makeBan, BanService } from "@/lib/services/ban"

export type Services = {
  prisma: PrismaClient
  amqp: AmqpService
  jiu: JiuService
  discovery: DiscoveryService
  xp: XpService
  wendy: WendyService
  uploader: UploaderService
  wasabi: WasabiService
  search: SearchService
  tag: TagService
  person: PersonService
  report: ReportService
  webhook: WebhookService
  ban: BanService
}

export function createServices(
  prisma: PrismaClient,
  amqp: AmqpService
): Services {
  const wendy = makeWendy({ prisma, amqp })
  const wasabi = makeWasabi()
  const search = makeSearch({ prisma })
  const ban = makeBan({ prisma })

  return {
    prisma,
    amqp,
    wendy,
    wasabi,
    search,
    ban,
    discovery: makeDiscovery({ prisma }),
    jiu: makeJiu({ amqp, prisma, wendy }),
    xp: makeXp({ prisma }),
    uploader: makeUploader({ prisma, wasabi, wendy }),
    tag: makeTag({ prisma, search }),
    report: makeReport({ prisma, ban }),
    person: makePerson({ prisma }),
    webhook: makeWebhook({
      prisma,
      discordWebhook: process.env.DISCORD_WEBHOOK_URL,
    }),
  }
}
