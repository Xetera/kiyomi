import { Image } from "@prisma/client";
import { pick } from "lodash";

export const publicImageFields: Array<keyof Image | string> = [
  "userId",
  "slug",
  "caption",
  "source",
  "height",
  "width",
  "bytes",
  "mimetype",
  "isNsfw",
  "views",
  "palette",
  "createdAt",
  "updatedAt",
];

export function transformImage(image: Image) {
  const mimetype = image.mimetype.toLowerCase();
  return {
    ...image,
    mimetype,
    url: `https://my.simp.pics/${image.slug}.${mimetype}`,
  };
}
