import { JiuService, makeJiu } from "./jiu"
import { AmqpService } from "../amqp"
import { DiscoveryService, makeDiscovery } from "./discovery"
import { PrismaClient } from "@prisma/client"
import { makeXp, XpService } from "./xp"
import { makeWendy, WendyService } from "./wendy"
import { makeUploader, UploaderService } from "./uploader"
import { makeWasabi, WasabiService } from "./wasabi"
import { makeSearch, SearchService } from "./search"
import { makeTag, TagService } from "./tag"
import { makePerson, PersonService } from "@/lib/services/person"
import { makeReport, ReportService } from "@/lib/services/report"
import { makeWebhook, WebhookService } from "@/lib/services/webhook"

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
}

export function createServices(
  prisma: PrismaClient,
  amqp: AmqpService
): Services {
  const wendy = makeWendy({ prisma, amqp })
  const wasabi = makeWasabi()
  const search = makeSearch({ prisma })

  return {
    prisma,
    amqp,
    wendy,
    wasabi,
    search,
    discovery: makeDiscovery({ prisma }),
    jiu: makeJiu({ amqp, prisma, wendy }),
    xp: makeXp({ prisma }),
    uploader: makeUploader({ prisma, wasabi, wendy }),
    tag: makeTag({ prisma, search }),
    report: makeReport({ prisma }),
    person: makePerson({ prisma }),
    webhook: makeWebhook({
      prisma,
      discordWebhook: process.env.DISCORD_WEBHOOK_URL,
    }),
  }
}
