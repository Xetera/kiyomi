import amqplib from "amqplib"
import { createClient } from "celery-node"

const amqpConnectionUrl = process.env.AMQP_URL ?? "amqp://localhost:3333"

export const celeryClient = createClient(amqpConnectionUrl, amqpConnectionUrl)

export type AmqpConnectionPromise = ReturnType<typeof amqplib.connect>
export type AmqpConnection = Awaited<AmqpConnectionPromise>

export let amqpPromise: AmqpConnectionPromise

if (process.env.NODE_ENV === "production") {
  amqpPromise = amqplib.connect(amqpConnectionUrl)
} else {
  if (!global.amqpPromise) {
    global.amqpPromise = amqplib.connect(amqpConnectionUrl)
  }
  amqpPromise = global.amqpPromise
}

type ImageRecognitionOptions = {
  ireneBotImageId?: number
  ireneBotIdolId?: number
}

export async function sendImageToFaceRecognition(
  slug: string,
  opts: ImageRecognitionOptions
) {
  const amqp = await amqpPromise
  const queueName = process.env.FACE_RECOGNITION_QUEUE ?? "labeler"

  const channel = await amqp.createChannel()
  await channel.assertQueue(queueName)
  channel.sendToQueue(queueName, Buffer.from(JSON.stringify({ slug, ...opts })))
}
