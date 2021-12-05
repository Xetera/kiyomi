import { PerceptualHashService } from "./perceptual-hash"
import { AmqpConnection } from "../amqp"
import { JiuMessage, JiuMessageMetadata } from "./jiu-types"
import { prisma } from "../db"
import camelCaseKeys from "camelcase-keys"
import { z } from "zod"

type JiuMessageType = z.infer<typeof JiuMessage>

type JiuDiscoveryProvider = {
  provider: string
  url: string
  destination: string
  waitDays: number
  name?: string
}

export type JiuService = {
  handleJiuMessage(message: JiuMessageType): Promise<void>
  providers(): Promise<JiuDiscoveryProvider[]>
}

type JiuServiceOptions = {
  phash: PerceptualHashService
  amqp: AmqpConnection
}

const DIRECT_QUEUE_NAME = "image_discovery"

export async function makeJiu(opts: JiuServiceOptions): Promise<JiuService> {
  console.log("Creating JiU")
  const channel = await opts.amqp.createChannel()
  // we only want to fetch 1 message at a time as they're quite expensive to process
  await channel.prefetch(1)
  await channel.assertQueue(DIRECT_QUEUE_NAME)

  const methods: JiuService = {
    async handleJiuMessage(message) {
      // reversing because we want to process the most recently discovered post last
      for (const post of message.posts.reverse()) {
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
            body: post.body,
            referencingGroups: metadata.success
              ? metadata.data?.groups ?? []
              : [],
            referencingPeople: metadata.success
              ? metadata.data?.people ?? []
              : [],
            originalPostDate: post.postDate,
            discoveredImages: {
              create: post.images.map((image, i) => {
                let duplicateImageId: number | undefined
                const t = hashes[i]
                // we don't care if the request failed or the hash couldn't be computed
                if (t) {
                  if (
                    t.status === "fulfilled" &&
                    t.value &&
                    opts.phash.isNearPerfectMatch(t.value.distance)
                  ) {
                    duplicateImageId = t.value?.id
                  } else if (t.status === "rejected") {
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
        console.log(`Created a post for ${post.uniqueIdentifier}`)
      }
    },
    async providers() {
      const data: any[] = await fetch(
        `${process.env.JIU_BASE_URL}/schedule`
      ).then((r) => r.json())
      return data.map((obj) => camelCaseKeys(obj))
    },
  }

  channel.consume(DIRECT_QUEUE_NAME, async (message) => {
    // TODO: DLX
    if (message) {
      try {
        const rawData = camelCaseKeys(JSON.parse(message.content.toString()), {
          deep: true,
        })
        let m: JiuMessageType
        try {
          m = await JiuMessage.parseAsync(rawData)
        } catch (err) {
          console.error("Got an unpredicted schema from Jiu")
          console.error(err)
          channel.nack(message, false, true)
          // TODO: handle this unpredictable schema change somehow?
          return
        }
        await methods.handleJiuMessage(m)
        channel.ack(message)
      } catch (err) {
        console.log(err)
        // TODO: error handle something here
        channel.nack(message, false, true)
      }
    }
  })
  return methods
}
