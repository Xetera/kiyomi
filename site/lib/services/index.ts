import { JiuService, makeJiu } from "@/lib/services/jiu"
import {
  makePerceptualHash,
  PerceptualHashService,
} from "@/lib/services/peceptual-hash"
import { amqpPromise } from "@/lib/amqp"

type Services = {
  jiu: JiuService
  phash: PerceptualHashService
}

let services: Services | undefined

export async function getServices(): Promise<Services> {
  if (services) {
    return services
  }
  const amqp = await amqpPromise
  const phash = makePerceptualHash()
  const jiu = await makeJiu({ phash, amqp })
  return {
    phash,
    jiu,
  }
}
