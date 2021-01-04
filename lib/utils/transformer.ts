import { Image } from "@prisma/client";
import { pick } from "lodash";

export const publicImageFields = {
  userId: true,
  slug: true,
  public: true,
  caption: true,
  source: true,
  height: true,
  width: true,
  bytes: true,
  mimetype: true,
  isNsfw: true,
  views: true,
  palette: true,
  createdAt: true,
  updatedAt: true,
} as const;

type ExtraImageProperties = {
  mimetype: string;
  url: string;
};

export function transformImage<T extends { mimetype: string; slug: string }>(
  image: T
): T & ExtraImageProperties {
  const mimetype = image.mimetype.toLowerCase();
  return {
    ...image,
    mimetype,
    url: `https://my.simp.pics/${image.slug}.${mimetype}`,
  };
}
