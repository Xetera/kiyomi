import amqplib from "amqplib"
import amqp, { ConsumeMessage } from "amqplib"
import { createClient } from "celery-node"
import { wait } from "./shared"

export const amqpConnectionUrl = process.env.AMQP_URL ?? "amqp://localhost:3333"
export type AmqpConnectionPromise = ReturnType<typeof amqplib.connect>
export type AmqpConnection = Awaited<AmqpConnectionPromise>

const logger = console

function connect(url: string): { connection?: amqp.Connection } {
  const RECONNECT_DELAY = 2000
  let out: { connection?: amqp.Connection } = {}

  async function attempt(url: string) {
    try {
      const connection = await amqp.connect(url)
      connection.on("error", (err) => {
        if (err.message !== "Connection closing") {
          logger.error("[AMQP] conn error", err.message)
        }
      })
      connection.on("open", () => {
        logger.log("[AQMP] Connected!")
      })
      connection.on("close", () => {
        logger.log("[AMQP] Reconnecting...")
        setTimeout(attempt, RECONNECT_DELAY)
      })
      out.connection = connection
    } catch (err) {
      console.error(err)
      await wait(RECONNECT_DELAY)
      return attempt(url)
    }
  }

  try {
    attempt(url)
    return out
  } catch (err) {
    if (err instanceof Error) {
      logger.error(err)
    }
    return out
  }
}

type AmqpInteraction<T> =
  | { status: "success"; data: T }
  | { status: "fail"; reason: "connectionFail" }

type AmqpData = {
  channel: amqp.Channel
}

export const makeAmqp = (url = amqpConnectionUrl) => {
  const consumed = new Set<string>()
  // this allows `connect` to continuously retry for a connection
  let amqp: { connection?: amqp.Connection } = connect(url)
  return {
    get connected() {
      return Boolean(amqp.connection)
    },
    async consumeWith<T>(
      id: string,
      listener: (
        conn: ConsumeMessage | null,
        channel: amqp.Channel
      ) => Promise<T> | T,
      opts: { prefetch: number; assertQueue: string }
    ) {
      if (!amqp.connection) {
        console.error(
          `Tried to consume a channel ${id} when it's not available. Retrying in 20 seconds`
        )
        setTimeout(() => {
          this.consumeWith(id, listener, opts)
        }, 5000)
        return
      }

      if (consumed.has(id)) {
        console.error(
          `Not adding a new listener to a queue (${id}) that's already handled`
        )
        return
      }

      // this should have some reconnection logic or something
      const channel = await amqp.connection?.createChannel()
      // we only want to fetch 1 message at a time as they're quite expensive to process
      await channel?.prefetch(1)
      await channel?.assertQueue(opts.assertQueue)
      channel?.consume(id, (msg) => listener(msg, channel))
      consumed.add(id)
    },
    async sendToQueue<T extends object>(queueName: string, data: T) {
      if (!amqp.connection) {
        throw Error(
          `[AMQP] cannot queue message into ${queueName} because it's not ready`
        )
      }
      const channel = await amqp.connection.createChannel()
      const queueInfo = await channel.assertQueue(queueName)
      channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)))
      return { queueInfo }
    },
    gracefulExit() {
      if (!amqp.connection) {
        console.log(
          "[AMQP] Not graceful exiting because there is no connection"
        )
        return
      }
      amqp.connection.close()
    },
  }
}

export type AmqpService = Awaited<ReturnType<typeof makeAmqp>>

type ImageRecognitionOptions = {
  ireneBotImageId?: number
  ireneBotIdolId?: number
}
