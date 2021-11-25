import { Image as ImageType } from "@prisma/client"

export function rawUrl(image: ImageType) {
  const baseCdnUrl = process.env.NEXT_PUBLIC_BASE_URL_CDN
  return `${baseCdnUrl}/${image.slug}.${image.mimetype.toLowerCase()}`
}

export function imageUrl(image: { slug: string }) {
  return `${process.env.NEXT_PUBLIC_BASE_URL}/image/${image.slug}`
}
