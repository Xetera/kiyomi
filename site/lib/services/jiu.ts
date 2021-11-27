import { PerceptualHashService } from "@/lib/services/peceptual-hash"
import { AmqpConnection } from "@/lib/amqp"
import z from "zod"
import { prisma } from "@/lib/db"

export type JiuService = {
  handleJiuMessage(message: JiuMessage): Promise<void>
}

type JiuServiceOptions = {
  phash: PerceptualHashService
  amqp: AmqpConnection
}

const DIRECT_QUEUE_NAME = "image_discovery"

const DISCOVERY_DEAD_LETTER_EXCHANGE_NAME = "image_discovery_retry"

export async function makeJiu(opts: JiuServiceOptions): Promise<JiuService> {
  const channel = await opts.amqp.createChannel()
  // we only want to fetch 1 message at a time as they're quite expensive to process
  await channel.prefetch(1)
  await channel.assertQueue(DIRECT_QUEUE_NAME)
  // await channel.assertExchange(
  //   DISCOVERY_DEAD_LETTER_EXCHANGE_NAME,
  //   "x-delayed-message",
  //   {
  //     autoDelete: false,
  //     durable: true,
  //     arguments: {
  //       "x-delayed-type": "direct",
  //     },
  //   }
  // )
  // await channel.bindQueue(
  //   DIRECT_QUEUE_NAME,
  //   DISCOVERY_DEAD_LETTER_EXCHANGE_NAME,
  //   DIRECT_QUEUE_NAME
  // )
  channel.consume(DIRECT_QUEUE_NAME, async (message) => {
    // TODO: DLX
    if (message) {
      try {
        const dataStr = JSON.parse(message.content.toString())
        let jiuMessage: JiuMessage
        try {
          jiuMessage = await JiuMessage.parseAsync(dataStr)
        } catch (err) {
          console.error("Got an unpredicted schema from Jiu")
          channel.nack(message, false, false)
          // TODO: handle this unpredictable schema change somehow?
          return
        }
        await methods.handleJiuMessage(jiuMessage)
        channel.ack(message)
      } catch (err) {
        console.log(err)
        // TODO: error handle something here
        channel.nack(message, false, false)
      }
    }
  })

  const methods: JiuService = {
    async handleJiuMessage(message) {
      for (const post of message.posts) {
        const hashes = await Promise.allSettled(
          post.images.map((image) => {
            return opts.phash.mostSimilarImage(image.mediaUrl)
          })
        )
        const metadata = JiuMessageMetadata.safeParse(post.metadata)
        const providerType = message.provider.type
        await prisma.discoveredPost.upsert({
          where: {
            discoveredProvider: {
              providerType,
              uniqueIdentifier: post.uniqueIdentifier,
            },
          },
          // we don't need to update anything, this is just for idempotence
          update: {},
          create: {
            providerType,
            uniqueIdentifier: post.uniqueIdentifier,
            accountAvatarUrl: post.account.avatarUrl,
            accountName: post.account.name,
            postUrl: post.url,
            referencingGroups: metadata.success ? metadata.data.groups : [],
            referencingPeople: metadata.success ? metadata.data.people : [],
            originalPostDate: post.postDate,
            discoveredImages: {
              create: post.images.map((image, i) => {
                let duplicateImageId: number | undefined
                const t = hashes[i]
                // we don't care if the request failed or the hash couldn't be computed
                if (t) {
                  if (t.status === "fulfilled") {
                    duplicateImageId = t.value?.id
                  } else {
                    console.error(
                      `Could not get hash value for ${image.mediaUrl}`
                    )
                    console.error(t.reason)
                  }
                }
                return {
                  mediaType: image.type,
                  providerType: message.provider.type,
                  url: image.mediaUrl,
                  duplicateImageId,
                  uniqueIdentifier: image.uniqueIdentifier,
                }
              }),
            },
          },
        })
      }
    },
  }
  return methods
}

const JiuProvider = z.object({
  type: z.string(),
  id: z.string(),
  ephemeral: z.boolean(),
})

const JiuAccount = z.object({
  name: z.string(),
  avatarUrl: z.string().optional(),
})

const JiuMedia = z.object({
  type: z.string(),
  mediaUrl: z.string(),
  referenceUrl: z.string().optional(),
  uniqueIdentifier: z.string(),
  metadata: z.unknown(),
})

const JiuPost = z.object({
  account: JiuAccount,
  uniqueIdentifier: z.string(),
  images: z.array(JiuMedia),
  body: z.string().optional(),
  url: z.string().optional(),
  postDate: z.string().optional(),
  metadata: z.unknown(),
})

const JiuMessageMetadata = z.object({
  groups: z.array(z.number()).optional(),
  people: z.array(z.number()).optional(),
})

const JiuMessage = z.object({
  // this is potentially added on the message on requeues
  retries: z.number().optional(),
  provider: JiuProvider,
  posts: z.array(JiuPost),
  metadata: JiuMessageMetadata,
})

type JiuMessage = z.infer<typeof JiuMessage>
