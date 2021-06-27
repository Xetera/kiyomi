import amqplib from "amqplib"

const amqpConnectionUrl = process.env.AMQP_URL ?? "amqp://localhost:3333"

export let amqpPromise: Promise<amqplib.Connection>

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
