import { PerceptualHashService } from "./perceptual-hash"
import { AmqpConnection } from "../amqp"
import { JiuMessage, JiuMessageMetadata } from "./jiu-types"
import { prisma } from "../db"
import camelCaseKeys from "camelcase-keys"
import { z } from "zod"
import { inspect } from "util"

type JiuMessageType = z.infer<typeof JiuMessage>

export type JiuService = {
  handleJiuMessage(message: JiuMessageType): Promise<void>
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
            body: post.body,
            referencingGroups: metadata.success ? metadata.data.groups : [],
            referencingPeople: metadata.success ? metadata.data.people : [],
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
                    t.value.distance <= 5
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

let a = {
  provider: { type: "WeverseArtistFeed", id: "14", ephemeral: false },
  posts: [
    {
      account: {
        name: "솨코입",
        avatar_url:
          "https://cdn-contents-web.weverse.io/user/dd94d6a1bb56407fbb146fcbd3e4c6fe328.jpg",
      },
      unique_identifier: "1677303290856455",
      images: [
        {
          type: "Image",
          media_url:
            "https://cdn-contents-web.weverse.io/user/xlx2048/jpg/c474953f08564372b8eeb9a46c60ccb3386.jpg",
          reference_url:
            "https://weverse.io/dreamcatcher/artist/1677303290856455?photoId=271029700",
          unique_identifier: "271029700",
          metadata: {
            height: 2880,
            width: 2160,
            thumbnail_url:
              "https://cdn-contents-web.weverse.io/user/mx750/jpg/c474953f08564372b8eeb9a46c60ccb3386.jpg",
          },
        },
        {
          type: "Image",
          media_url:
            "https://cdn-contents-web.weverse.io/user/xlx2048/jpg/b01699e3e58a49aaa631b93f239fc10e125.jpg",
          reference_url:
            "https://weverse.io/dreamcatcher/artist/1677303290856455?photoId=271029701",
          unique_identifier: "271029701",
          metadata: {
            height: 2880,
            width: 2160,
            thumbnail_url:
              "https://cdn-contents-web.weverse.io/user/mx750/jpg/b01699e3e58a49aaa631b93f239fc10e125.jpg",
          },
        },
        {
          type: "Image",
          media_url:
            "https://cdn-contents-web.weverse.io/user/xlx2048/jpg/e2e9557be986403fb7c827feb044a92c218.jpg",
          reference_url:
            "https://weverse.io/dreamcatcher/artist/1677303290856455?photoId=271029702",
          unique_identifier: "271029702",
          metadata: {
            height: 2818,
            width: 2055,
            thumbnail_url:
              "https://cdn-contents-web.weverse.io/user/mx750/jpg/e2e9557be986403fb7c827feb044a92c218.jpg",
          },
        },
        {
          type: "Image",
          media_url:
            "https://cdn-contents-web.weverse.io/user/xlx2048/jpg/01a4833e6a5546048c40c771e9aae12b526.jpg",
          reference_url:
            "https://weverse.io/dreamcatcher/artist/1677303290856455?photoId=271029703",
          unique_identifier: "271029703",
          metadata: {
            height: 2880,
            width: 2160,
            thumbnail_url:
              "https://cdn-contents-web.weverse.io/user/mx750/jpg/01a4833e6a5546048c40c771e9aae12b526.jpg",
          },
        },
      ],
      body: "썸냐먹고 따뜻해질랭😋♥️",
      url:
        "https://weverse.io/dreamcatcher/artist/1677303290856455?photoId=271029700",
      post_date: "2021-11-27T05:38:14",
      metadata: { author_id: 62, author_name: "솨코입" },
    },
  ],
  metadata: null,
}
