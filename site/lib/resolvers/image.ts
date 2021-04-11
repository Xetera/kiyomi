import { humanFileSize } from "../shared";
import _ from "lodash";
import {
  objectType,
  queryField,
  nonNull,
  stringArg,
  list,
  mutationField,
  inputObjectType,
} from "nexus";
import { hasRole, Role } from "../permissions";
import { Appearance, FaceSource, Person, Prisma } from "@prisma/client";

export const User = objectType({
  name: "Image",
  definition(t) {
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
      .createdAt();
    t.field("fileSize", {
      type: nonNull("String"),
      description:
        "Human readable file size. Use `bytes` for a number representation.",
      resolve(file) {
        return humanFileSize(file.bytes);
      },
    });
    t.nonNull.string("url", {
      description: "Link to the image on the site",
      resolve(p) {
        return `${process.env.NEXT_PUBLIC_BASE_URL}/image/${p.slug}`;
      },
    });
    t.nonNull.string("rawUrl", {
      description: "Direct link to the image on the CDN",
      resolve(p) {
        const baseCdnUrl = process.env.NEXT_PUBLIC_BASE_URL_CDN;
        return `${baseCdnUrl}/${p.slug}.${p.mimetype.toLowerCase()}`;
      },
    });
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
        ]);
        const appearanceMap = _.keyBy(
          appearances,
          (appearance) => appearance.id
        );

        return faces.filter(({ appearanceId }) => {
          return !appearanceId || !(appearanceId in appearanceMap);
        });
      },
    });
  },
});

export const Query = queryField((t) => {
  t.field("image", {
    type: "Image",
    args: {
      slug: nonNull(stringArg()),
    },
    async resolve(_root, args, { prisma }) {
      const { slug } = args;
      return await prisma.image.findUnique({
        where: { slug },
      });
    },
  });
});

export const FaceInput = inputObjectType({
  name: "FaceInput",
  definition(t) {
    t.nonNull.float("x");
    t.nonNull.float("y");
    t.nonNull.float("width");
    t.nonNull.float("height");
    t.nonNull.float("certainty");
    t.nonNull.list.nonNull.float("descriptor");
  },
});

export const Mutation = mutationField((t) => {
  t.field("markFaces", {
    type: "Image",
    description:
      "Image face recognition update. Only available to bot accounts",
    args: {
      slug: nonNull(stringArg()),
      personName: "String",
      ireneBotId: "Int",
      replacePreviousScan: "Boolean",
      faces: nonNull(list(nonNull("FaceInput"))),
    },
    async authorize(_, args, { prisma, user }) {
      if (!user) {
        return false;
      }
      // indexed query
      const role = await prisma.role.findUnique({
        where: {
          userRole: {
            userId: user.id,
            name: Role.Editor,
          },
        },
      });
      return Boolean(role);
    },
    async resolve(
      _root,
      { slug, faces, personName, ireneBotId, replacePreviousScan },
      { prisma, user }
    ) {
      const image = await prisma.image.findUnique({
        where: { slug },
        include: { faces: true },
      });
      if (!image) {
        throw Error("Invalid image slug");
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
        });
      }

      let existingPerson: Person | undefined = ireneBotId
        ? (await prisma.person.findUnique({
            where: { ireneBotId },
          })) ?? undefined
        : undefined;

      if (faces.length === 1 && personName && !existingPerson) {
        existingPerson = await prisma.person.create({
          data: {
            ireneBotId: ireneBotId,
            name: personName,
          },
        });
      }

      let existingAppearance: Appearance | undefined;
      if (existingPerson) {
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
                id: user!.id,
              },
            },
          },
        });
      }
      prisma.image
        .update({
          where: {
            slug,
          },
          data: {
            faceScanDate: new Date(),
          },
        })
        .catch((err) => {
          console.error(err);
        });
      const BASE_STRING = `INSERT INTO faces (image_id, score, descriptor, x, y, width, height, added_by_id, appearance_id, source) VALUES`;
      const templatedString = faces
        .map(({ x, y, height, width, descriptor, certainty }) => {
          const cube = descriptor.join(",");
          const userId = user!.id;
          const linkedPerson = existingAppearance?.id ?? "NULL";
          const source = user!.bot ? FaceSource.Scan : FaceSource.Manual;
          const data = `(${image.id}, ${certainty}, CUBE(ARRAY[${cube}]), ${x}, ${y}, ${width}, ${height}, ${userId}, ${linkedPerson}, '${source}')`;
          return data;
        })
        .join(",");

      if (faces.length > 0) {
        await prisma.$executeRaw`${Prisma.raw(BASE_STRING + templatedString)}`;
      }
      return image;
    },
  });
  t.field("test", {
    type: "Image",
    description:
      "Image face recognition update. Only available to bot accounts",
    args: {
      slug: nonNull(stringArg()),
    },
    async authorize(_, args, { prisma, user }) {
      if (!user) {
        return false;
      }
      // indexed query
      const roles = await prisma.role.findMany({
        where: {
          userId: user.id,
        },
      });
      return hasRole(roles, Role.Administrator);
    },
    async resolve(_root, { slug }, { prisma, amqp }) {
      const queueName = process.env.FACE_RECOGNITION_QUEUE ?? "labeler";

      const channel = await amqp.createChannel();
      await channel.assertQueue(queueName);
      channel.sendToQueue(queueName, Buffer.from(JSON.stringify({ slug })));
      const image = await prisma.image.findUnique({
        where: {
          slug,
        },
      });
      return image;
    },
  });
});
