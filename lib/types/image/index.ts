import { humanFileSize } from "../../shared";
import _ from "lodash";
import {
  objectType,
  queryField,
  nonNull,
  stringArg,
  list,
  enumType,
} from "nexus";
import { ImageWhereInput } from "@/lib/__generated__/request";

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
          "Block hash of the image, useful for doing reverse search with hamming distance.",
      })
      .palette({
        description:
          "Dominant colors in the image in decimal format, sorted by frequency.",
      })
      .isNsfw()
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
    t.field("url", {
      type: nonNull("String"),
      description: "Link to the image on the site",
      resolve(p) {
        return `${process.env.NEXT_PUBLIC_BASE_URL}/image/${p.slug}`;
      },
    });
    t.field("rawUrl", {
      type: nonNull("String"),
      description: "Direct link to the image on the CDN",
      resolve(p) {
        const baseCdnUrl = process.env.NEXT_PUBLIC_BASE_URL_CDN;
        return `${baseCdnUrl}/${p.slug}.${p.mimetype.toLowerCase()}`;
      },
    });
    t.field("unknownFaces", {
      type: nonNull(list(nonNull("Face"))),
      async resolve(image, {}, { prisma }) {
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
    async resolve(_root, args, { prisma, user }) {
      const { slug } = args;
      return await prisma.image.findUnique({
        where: { slug },
        include: { user: true },
      });
    },
  });
});
