import type { Image as ImageType } from "@prisma/client"

export function downloadDiscoveredImageUrl(id: number) {
  const params = new URLSearchParams({ discoveredImageId: id.toString() })
  return `${process.env.NEXT_PUBLIC_BASE_URL}/api/image/download?${params}`
}

export function rawUrl(image: ImageType) {
  const baseCdnUrl = process.env.NEXT_PUBLIC_BASE_URL_CDN
  return `${baseCdnUrl}/${image.slug}.${image.mimetype.toLowerCase()}`
}

export function imageUrl(image: { slug: string }) {
  return `${process.env.NEXT_PUBLIC_BASE_URL}/image/${image.slug}`
}

export function upload() {}
