import { JiuService, makeJiu } from "./jiu"
import { makePerceptualHash, PerceptualHashService } from "./perceptual-hash"
import { amqpPromise } from "../amqp"

export type Services = {
  jiu: JiuService
  phash: PerceptualHashService
}

let errored = false

export async function getServices(): Promise<Services> {
  if (global.servicesPromise && !errored) {
    return global.servicesPromise
  }
  // terrible disgusting next.js hack to make sure that we only
  // initialize this object one time without getting owned
  // by the thundering herd problem
  async function getter(): Promise<Services> {
    const amqp = await amqpPromise
    const phash = makePerceptualHash()
    const jiu = await makeJiu({ phash, amqp })
    return {
      phash,
      jiu,
    }
  }

  global.servicesPromise = getter().then(
    (result) => {
      errored = false
      return result
    },
    (err) => {
      errored = true
      throw err
    }
  )
  return global.servicesPromise
}
