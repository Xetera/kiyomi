import { humanFileSize } from "../shared"
import _ from "lodash"
import {
  objectType,
  queryField,
  nonNull,
  stringArg,
  list,
  mutationField,
  inputObjectType,
  intArg,
  enumType,
} from "nexus"
import { hasRole, Role } from "../permissions"
import { Appearance, FaceSource, Person, Prisma } from "@prisma/client"
import { Image as ImageType } from "@prisma/client"
import { imgproxy } from "../imgproxy"
import { formatDuration, intervalToDuration, sub } from "date-fns"
import { imageConnections } from "../graph"

export const Thumbnail = objectType({
  name: "Thumbnail",
  description: "Preview urls of an image",
  definition(t) {
    t.nonNull.string("large")
    t.nonNull.string("medium")
    t.nonNull.string("small")
  },
})

export const Image = objectType({
  name: "Image",
  definition(t) {
    function rawUrl(image: ImageType) {
      const baseCdnUrl = process.env.NEXT_PUBLIC_BASE_URL_CDN
      return `${baseCdnUrl}/${image.slug}.${image.mimetype.toLowerCase()}`
    }
    t.model
      .id()
      .width({
        description: "Width of the image in pixels.",
      })
      .height({
        description: "Height of the image in pixels.",
      })
      .uploadType()
      .hash({
        description: "SHA256 checksum of the image.",
      })
      .fileName({
        description: "The name the image file was uploaded with.",
      })
      .pHash({
        description:
          "Block hash of the image, useful for doing reverse search using hamming distance.",
      })
      .palette({
        description:
          "Dominant colors in the image in decimal format, sorted by frequency.",
      })
      .isNsfw({
        description: "( ͡° ͜ʖ ͡°)",
      })
      .source({
        description:
          "The url the image was taken from (if applicable). Not guaranteed to be a direct image url.",
      })
      .user({
        alias: "uploadedBy",
      })
      .tags()
      .slug({
        description: "The unique url identifier of the image.",
      })
      .public({
        description: "The visibility status of the image.",
      })
      .caption()
      .views()
      // @ts-ignore
      .mimetype({
        description: "The IANA media type of the image.",
      })
      .bytes()
      .appearances()
      .faceScanDate()
      .createdAt()
      .createdAt()
    t.field("thumbnail", {
      type: nonNull(Thumbnail),
      resolve(img) {
        const base = imgproxy
          .image(rawUrl(img))
          .width(0)
          .resizeType("fill")
          .extension("webp")
        return {
          small: base.height(350).get(),
          medium: base.height(500).get(),
          large: base.height(900).get(),
        }
      },
    })
    t.field("fileSize", {
      type: nonNull("String"),
      description:
        "Human readable file size. Use `bytes` for a number representation.",
      resolve(file) {
        return humanFileSize(file.bytes)
      },
    })
    t.nonNull.string("url", {
      description: "Link to the image on the site",
      resolve(p) {
        return `${process.env.NEXT_PUBLIC_BASE_URL}/image/${p.slug}`
      },
    })
    t.nonNull.string("rawUrl", {
      description: "Direct link to the image on the CDN",
      resolve(p) {
        return rawUrl(p)
      },
    })
    t.nonNull.float("aspectRatio", {
      description: "The aspect ratio of the image",
      resolve(p) {
        return p.width / p.height
      },
    })
    t.field("liked", {
      type: "Boolean",
      description: "False if not logged in",
      resolve(image, _, { prisma, user }) {
        if (!user) return false
        return prisma.imageLike
          .findUnique({
            where: {
              likedImage: {
                userId: user.id,
                imageId: image.id,
              },
            },
          })
          .then(Boolean)
      },
    })
    t.field("unknownFaces", {
      type: nonNull(list(nonNull("Face"))),
      async resolve(image, _args, { prisma }) {
        const [appearances, faces] = await Promise.all([
          // prisma optimizes the N+1 problem here
          prisma.appearance.findMany({
            where: {
              imageId: image.id,
            },
          }),
          prisma.face.findMany({
            where: {
              imageId: image.id,
            },
          }),
        ])
        const appearanceMap = _.keyBy(
          appearances,
          (appearance) => appearance.id
        )

        return faces.filter(({ appearanceId }) => {
          return !appearanceId || !(appearanceId in appearanceMap)
        })
      },
    })

    const MAX_CONNECTIONS_DEPT = 4
    t.nonNull.field("connections", {
      type: ImageConnections,
      description: `A graph of connections people in this image share with others based on images they appear together in up to a depth of ${MAX_CONNECTIONS_DEPT}`,
      args: {
        depth: nonNull(intArg({ default: 2 })),
      },
      async resolve(base, { depth: maxDepth }, { prisma }) {
        return imageConnections(base, maxDepth, prisma)
      },
    })
  },
})

export const EdgeType = enumType({
  name: "ImageConnectionEdge",
  members: ["IMAGE_TO_PERSON", "PERSON_TO_IMAGE"],
})

export const ImageEdge = objectType({
  name: "ImageEdge",
  definition(t) {
    // we are assuming that all objects in the database
    // are uniquely identified by an integer value
    // regardless of their type
    t.nonNull.int("from")
    t.nonNull.int("to")
    t.field("type", {
      type: EdgeType,
    })
  },
})

export const ImageConnections = objectType({
  name: "ImageConnections",
  definition(t) {
    t.nonNull.list.nonNull.field("images", {
      type: "Image",
    })
    t.nonNull.list.nonNull.field("people", {
      type: "Person",
    })
    t.nonNull.list.nonNull.field("edges", {
      type: ImageEdge,
    })
  },
})

export const Query = queryField((t) => {
  t.crud.images({
    filtering: true,
    pagination: true,
    ordering: true,
    resolve(root, args, ctx, info, original) {
      return original(
        root,
        {
          ...args,
          where: {
            ...args.where,
            public: { equals: true },
          },
        },
        ctx,
        info
      )
    },
  })
  t.field("image", {
    type: "Image",
    description: "Find a single image by its slug.",
    args: {
      slug: nonNull(stringArg()),
    },
    async resolve(_root, args, { prisma }) {
      const { slug } = args
      return await prisma.image.findUnique({
        where: { slug },
      })
    },
  })
  t.field("imageConnections", {
    type: ImageConnections,
    args: {
      slug: nonNull(stringArg()),
      depth: nonNull(intArg({ default: 2 })),
    },
    async resolve(t, { slug, depth: maxDepth }, { prisma }) {
      const base = await prisma.image.findUnique({ where: { slug } })
      if (!base) {
        throw Error("Invalid image slug")
      }
      return imageConnections(base, maxDepth, prisma)
    },
  })
})

export const Mutation = mutationField((t) => {
  t.field("scanFaces", {
    type: nonNull(QueueInformation),
    description: "Queue an image to get scanned for faces",
    args: {
      slug: nonNull(stringArg()),
    },
    async authorize(_, args, { prisma, user }) {
      if (!user) {
        return false
      }
      return true
      // allowing any logged in user for now

      // const role = await prisma.role.findUnique({
      //   where: {
      //     userRole: {
      //       userId: user.id,
      //       name: Role.Administrator,
      //     },
      //   },
      // });

      // return Boolean(role);
    },
    async resolve(_root, { slug }, { prisma, amqp }) {
      const queueName = process.env.FACE_RECOGNITION_QUEUE ?? "labeler"
      if (!amqp) {
        throw Error("Could not establish AMQP connection")
      }

      const existingImage = await prisma.image.findUnique({
        where: {
          slug,
        },
      })
      if (!existingImage) {
        throw Error("No such image")
      }
      const { faceScanRequestDate, faceScanDate } = existingImage
      const minuteThreshold = 30

      const tooSoon =
        faceScanRequestDate &&
        sub(new Date(), { minutes: minuteThreshold }) < faceScanRequestDate

      const scannedAfterRequest =
        faceScanDate &&
        faceScanRequestDate &&
        faceScanRequestDate > faceScanDate

      if (tooSoon && !scannedAfterRequest) {
        const duration = intervalToDuration({
          start: faceScanRequestDate!,
          end: new Date(),
        })
        const durationString = formatDuration(duration)
        throw Error(
          `This image was already queued for scanning ${durationString} ago.`
        )
      }

      const channel = await amqp.createChannel()
      const queueInfo = await channel.assertQueue(queueName)
      channel.sendToQueue(queueName, Buffer.from(JSON.stringify({ slug })))
      prisma.image
        .update({
          where: { slug },
          data: { faceScanRequestDate: new Date() },
        })
        .catch((err) => {
          console.error(`Couldn't set face recognition request date`)
          console.error(err)
        })
      console.log(`Got an image queue request for ${slug}`)
      return {
        queueSize: queueInfo.messageCount,
      }
    },
  })
  t.field("toggleLike", {
    type: nonNull("Image"),
    args: {
      imageId: nonNull("Int"),
    },
    async authorize(_, {}, { user }) {
      return Boolean(user)
    },
    async resolve(_, { imageId }, { prisma, user }) {
      const likedImage = { userId: user!.id, imageId }
      const exists = await prisma.imageLike.findUnique({
        select: { id: true },
        where: { likedImage },
      })
      if (exists) {
        const result = await prisma.imageLike.delete({
          where: { likedImage },
          include: { image: true },
        })
        return result.image
      } else {
        const result = await prisma.imageLike.create({
          data: likedImage,
          include: { image: true },
        })
        return result.image
      }
    },
  })
})

export const PrivateFaceInput = inputObjectType({
  name: "FaceInput",
  definition(t) {
    t.nonNull.float("x")
    t.nonNull.float("y")
    t.nonNull.float("width")
    t.nonNull.float("height")
    t.nonNull.float("certainty")
    t.nonNull.list.nonNull.float("descriptor")
  },
})

export const QueueInformation = objectType({
  name: "QueueInfo",
  definition(t) {
    t.nonNull.int("queueSize")
  },
})

export const PrivateQuery = queryField((t) => {
  t.field("personImages", {
    type: list("Image"),
    args: {
      personIds: list(intArg()),
    },
    resolve(_) {},
  })
})

export const PrivateMutation = mutationField((t) => {
  t.field("labelImage", {
    type: "Image",
    description:
      "Add metadata labels to an existing image. Only available to bot accounts",
    args: {
      slug: nonNull(stringArg()),
      personName: "String",
      ireneBotId: "Int",
      replacePreviousScan: "Boolean",
      faces: nonNull(list(nonNull(PrivateFaceInput))),
      pHash: "String",
      palette: nonNull(list(nonNull("Int"))),
    },
    async authorize(_, args, { prisma, user }) {
      if (!user) {
        return false
      }
      // indexed query
      const role = await prisma.role.findUnique({
        where: {
          userRole: {
            userId: user.id,
            name: Role.Editor,
          },
        },
      })
      return Boolean(role)
    },
    async resolve(
      _root,
      {
        slug,
        faces,
        personName,
        ireneBotId,
        replacePreviousScan,
        pHash,
        palette,
      },
      { prisma, user }
    ) {
      if (!user) {
        throw new Error("Unauthorized")
      }
      const image = await prisma.image.findUnique({
        where: { slug },
        include: { faces: true, appearances: true },
      })
      if (!image) {
        throw Error("Invalid image slug")
      }
      if (replacePreviousScan) {
        await prisma.face.deleteMany({
          where: {
            id: {
              in: image.faces
                .filter((face) => face.source === "Scan")
                .map((face) => face.id),
            },
          },
        })
      }

      let existingAppearance: Appearance | undefined
      const shouldLinkWithExistingAppearance = image.appearances.length === 1
      if (shouldLinkWithExistingAppearance) {
        existingAppearance = image.appearances[0]
      }
      let existingPerson: Person | undefined = existingAppearance?.personId
        ? (await prisma.person.findUnique({
            where: { ireneBotId: existingAppearance.personId },
          })) ?? undefined
        : undefined

      if (faces.length === 1 && personName && !existingPerson) {
        existingPerson = await prisma.person.create({
          data: {
            ireneBotId: ireneBotId,
            name: personName,
          },
        })
      }

      if (existingPerson && !existingAppearance) {
        existingAppearance = await prisma.appearance.create({
          data: {
            image: {
              connect: {
                id: image.id,
              },
            },
            person: {
              connect: {
                id: existingPerson.id,
              },
            },
            addedBy: {
              connect: {
                id: user.id,
              },
            },
          },
        })
      }
      prisma.image
        .update({
          where: {
            slug,
          },
          data: {
            faceScanDate: new Date(),
            pHash: pHash,
            palette,
          },
        })
        .catch((err) => {
          console.error(err)
        })
      const BASE_STRING = `INSERT INTO faces (image_id, score, descriptor, x, y, width, height, added_by_id, appearance_id, source) VALUES`
      const templatedString = faces
        .map(({ x, y, height, width, descriptor, certainty }) => {
          const cube = descriptor.join(",")
          const userId = user.id
          const linkedPerson = existingAppearance?.id ?? "NULL"
          const source = user.bot ? FaceSource.Scan : FaceSource.Manual
          const data = `(${image.id}, ${certainty}, CUBE(ARRAY[${cube}]), ${x}, ${y}, ${width}, ${height}, ${userId}, ${linkedPerson}, '${source}')`
          return data
        })
        .join(",")

      if (faces.length > 0) {
        await prisma.$executeRaw`${Prisma.raw(BASE_STRING + templatedString)}`
      }
      return image
    },
  })
})
