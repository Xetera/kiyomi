import { AmqpService } from "../amqp"
import {
  JiuAddProvider,
  JiuMessage,
  JiuMessageMetadata,
  JiuStats,
} from "./jiu-types"
import camelCaseKeys from "camelcase-keys"
import { z } from "zod"
import { Prisma, PrismaClient } from "@prisma/client"
import { WendyService } from "@/lib/services/wendy"

type JiuMessageType = z.infer<typeof JiuMessage>

type JiuDiscoveryProvider = {
  provider: string
  url: string
  destination: string
  waitDays: number
  name?: string
  official: boolean
}

type JiuServiceOptions = {
  prisma: PrismaClient
  wendy: WendyService
  amqp: AmqpService
}

const DIRECT_QUEUE_NAME =
  process.env.NODE_ENV === "production"
    ? "image_discovery"
    : "image_discovery.dev"

function convertProviderType(m: string) {
  switch (m) {
    case "twitter.timeline":
      return "TwitterTimeline"
    case "united_cube.artist_feed":
      return "UnitedCubeArtistFeed"
    case "weverse.artist_feed":
      return "WeverseArtistFeed"
    default:
      return m
  }
}

const fetchJiu = (url: string, init?: RequestInit) =>
  fetch(`${process.env.JIU_BASE_URL}${url}`, init)

export function makeJiu(opts: JiuServiceOptions) {
  const { prisma } = opts
  const methods = {
    async handleJiuMessage(message: JiuMessageType): Promise<void> {
      // reversing because we want to process the most recently discovered post last
      for (const post of message.posts.reverse()) {
        const hashes = await Promise.allSettled(
          post.images.map(async (image) => {
            const result = await opts.wendy
              .mostSimilarImage(image.mediaUrl)
              .catch((err) => {
                console.error(err)
                // rethrowing to make sure it's not marked as settled
                throw err
              })
            return {
              ...result,
              uniqueIdentifier: image.uniqueIdentifier,
            }
          })
        )
        const metadata = JiuMessageMetadata.safeParse(post.metadata)
        const providerType = convertProviderType(message.provider.type)
        const discoveredImages = post.images.map(
          (image, i): Prisma.DiscoveredImageCreateOrConnectWithoutPostInput => {
            let duplicateImageId: number | undefined
            let duplicateDiscoveredImageId: number | undefined
            const t = hashes[i]
            // we don't care if the request failed or the hash couldn't be computed
            if (t) {
              if (
                t.status === "fulfilled" &&
                t.value.result?.distance &&
                opts.wendy.isNearPerfectMatch(t.value.result.distance)
              ) {
                if (t.value.result.type === "image") {
                  duplicateImageId = t.value.result.id
                } else {
                  duplicateDiscoveredImageId = t.value.result.id
                }
              } else if (t.status === "rejected") {
                console.error(`Could not get hash value for ${image.mediaUrl}`)
                console.error(t.reason)
              }
            }
            return {
              where: {
                providerIdentity: {
                  providerType,
                  uniqueIdentifier: image.uniqueIdentifier,
                },
              },
              create: {
                mediaType: image.type,
                referenceUrl: image.referenceUrl,
                providerType,
                url: image.mediaUrl,
                // kind of a gross way of doing it but the image can be duplicates of many things
                duplicateImageId: duplicateImageId ?? null,
                duplicateDiscoveredImageId: duplicateDiscoveredImageId ?? null,
                uniqueIdentifier: image.uniqueIdentifier,
                // pHash: pHash ? Array.from(pHash) : null,
              },
            }
          }
        )
        await prisma.discoveredPost.upsert({
          where: {
            discoveredProvider: {
              providerType,
              uniqueIdentifier: post.uniqueIdentifier,
            },
          },
          // we don't need to update anything, this is just for idempotence
          update: {
            discoveredImages: {
              connectOrCreate: discoveredImages,
            },
          },
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
              connectOrCreate: discoveredImages,
            },
          },
        })
        for (const image of post.images) {
          const hash = hashes.find(
            (has) =>
              has.status === "fulfilled" &&
              has.value.uniqueIdentifier === image.uniqueIdentifier
          )
          if (!hash) {
            console.log("no hash")
            continue
          }
          const dd =
            hash.status === "fulfilled" ? Array.from(hash.value.cube) : []
          console.log(dd)
          console.log(message.provider.type, image.uniqueIdentifier)
          await prisma.$executeRaw(
            `
            UPDATE discovered_images SET p_hash = CUBE(ARRAY[${dd.join(",")}])
                WHERE provider_type = $1 AND unique_identifier = $2
          `,
            convertProviderType(message.provider.type) ?? null,
            image.uniqueIdentifier ?? null
          )
        }
        console.log(`Created a post for ${post.uniqueIdentifier}`)
      }
    },
    async providers(): Promise<JiuStats[]> {
      const response = await fetchJiu(`/v1/stats`).then((r) => r.json())
      return response.stats.map(camelCaseKeys)
    },
    async schedule(): Promise<JiuDiscoveryProvider[]> {
      const data: any[] = await fetchJiu(`/v1/schedule`).then((r) => r.json())
      return data.map((obj) => camelCaseKeys(obj))
    },
    async addProvider(body: JiuAddProvider): Promise<string> {
      const result = await fetchJiu(`/v1/provider`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(body),
      }).then((r) => r.text())
      console.log(result)
      return result
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
            console.log(`Got a new post from Jiu [${m.provider.type}]`)
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
