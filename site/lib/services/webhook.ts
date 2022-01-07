import { siteEvent } from "@/lib/observer"
import { PrismaClient, User } from "@prisma/client"
import { Routing } from "@/client/routing"
import { personPreferredName } from "@/client/data/person-mappers"
import groupBy from "lodash/groupBy"
import { bufferTime } from "rxjs"

export type WebhookServiceOptions = {
  discordWebhook?: string
  prisma: PrismaClient
}

export const makeWebhook = ({
  discordWebhook,
  prisma,
}: WebhookServiceOptions) => {
  function log(data: any) {
    return fetch(`${discordWebhook}?wait=true`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        username: "Kiyomi",
        avatar_url: "https://kiyomi.io/kiyomi.png",
        ...data,
      }),
    }).catch(console.error)
  }

  const imageUploadSubscription = siteEvent.image.upload$
    // these have to be buffered to prevent bombing discord logs
    .pipe(bufferTime(30000))
    .subscribe(async (images) => {
      const uploads = [...images].sort((a, b) =>
        a?.userId && b?.userId ? a.userId - b.userId : 0
      )
      const groupedUpdates = groupBy(uploads, (upload) => upload.userId)
      for (const [userId, images] of Object.entries(groupedUpdates)) {
        const user = userId
          ? await prisma.user.findUnique({
              where: { id: Number(userId) },
            })
          : undefined

        function getName(user?: User | null) {
          const placeholder = "Unknown User"
          if (!user) {
            return placeholder
          }
          const name = user.name ?? placeholder
          if (user.bot) {
            return `${name} [bot]`
          }
          return name
        }

        const urls = images
          .map((image) => {
            const url = Routing.toImage(image.slug)
            return images.length > 3 ? `<${url}>` : url
          })
          .join("\n")
        const content = `\`${getName(user)}\` uploaded ${
          images.length
        } new images \n${urls}`
        log({ content })
      }
    })

  const personUpdateSubscription = siteEvent.person.update$.subscribe(
    async (update) => {
      const [user, person] = await Promise.all([
        prisma.user.findUnique({
          where: { id: update.userId },
        }),
        prisma.person.findUnique({
          where: { id: update.personId },
          include: {
            preferredAlias: true,
          },
        }),
      ])
      if (!user || !person) {
        return
      }
      const pref = personPreferredName(person)
      const url = Routing.toPerson(person.id, pref)
      const content = `\`${user.name}\` updated Idol [**${pref}**]\n<${url}>`
      log({ content })
    }
  )
  const reportsSubscription = siteEvent.image.report$.subscribe(
    async (report) => {
      if (!discordWebhook) {
        console.warn(`Not processing report because missing discord webhook`)
        return
      }
      const [user, image] = await Promise.all([
        prisma.user.findUnique({
          where: { id: report.reportedById },
        }),
        prisma.image.findUnique({ where: { id: report.imageId } }),
      ])
      const username = user ? user.name : `Unknown User`

      if (!user || !image) {
        console.log("no image or user?", user, image)
        return
      }

      log({
        embeds: [
          {
            title: `New report from **${username}**`,
            description: report.reason ?? "No reason given",
            fields: [
              {
                name: "Dismiss Report",
                value: `[click here](${process.env.NEXT_PUBLIC_BASE_URL}/report/${report.id}/dismiss)`,
              },
              {
                name: "Hide Image",
                value: `[click here](${process.env.NEXT_PUBLIC_BASE_URL}/report/${report.id}/hide)`,
              },
              {
                name: "Delete Image",
                value: `[click here](${process.env.NEXT_PUBLIC_BASE_URL}/report/${report.id}/delete)`,
              },
            ],
            image: {
              url: Routing.toRawImage(image),
            },
          },
        ],
        components: [
          {
            type: 1,
            components: [
              {
                type: 2,
                label: "Dismiss Report",
                url: "https://google.com",
                style: 5,
              },
            ],
          },
        ],
      })
    }
  )
  return {
    reportsSubscription,
    imageUploadSubscription,
    personUpdateSubscription,
  }
}

export type WebhookService = ReturnType<typeof makeWebhook>
