import { PerceptualHashService } from "./perceptual-hash"
import { AmqpService } from "../amqp"
import { JiuMessage, JiuMessageMetadata } from "./jiu-types"
import camelCaseKeys from "camelcase-keys"
import { z } from "zod"
import { PrismaClient } from "@prisma/client"

type JiuMessageType = z.infer<typeof JiuMessage>

type JiuDiscoveryProvider = {
  provider: string
  url: string
  destination: string
  waitDays: number
  name?: string
}

type JiuServiceOptions = {
  prisma: PrismaClient
  phash: PerceptualHashService
  amqp: AmqpService
}

const DIRECT_QUEUE_NAME = "image_discovery"

export function makeJiu(opts: JiuServiceOptions) {
  const { prisma } = opts
  const methods = {
    async handleJiuMessage(message: JiuMessageType): Promise<void> {
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
                    t.value?.distance &&
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
    async providers(): Promise<JiuDiscoveryProvider[]> {
      const data: any[] = await fetch(
        `${process.env.JIU_BASE_URL}/schedule`
      ).then((r) => r.json())
      return data.map((obj) => camelCaseKeys(obj))
    },
  }

  opts.amqp
    .consumeWith(
      DIRECT_QUEUE_NAME,
      async (message, channel) => {
        // TODO: DLX
        if (message) {
          try {
            const rawData = camelCaseKeys(
              JSON.parse(message.content.toString()),
              {
                deep: true,
              }
            )
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
      },
      { prefetch: 1, assertQueue: DIRECT_QUEUE_NAME }
    )
    .catch((err) => {
      console.error("Error attaching listener to Jiu queue")
    })
  return methods
}

export type JiuService = Awaited<ReturnType<typeof makeJiu>>
