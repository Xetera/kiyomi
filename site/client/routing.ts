import { encodeUriFriendly } from "@/client/data"
import type { Image } from "@prisma/client"

const base = process.env.NEXT_PUBLIC_BASE_URL
const f = (url: string) => `${base}${url}`

export const Routing = {
  toGroup(id: number, name?: string) {
    return f(`/group/${encodeUriFriendly(id, name)}`)
  },
  toPerson(id: number, name?: string) {
    return f(`/idol/${encodeUriFriendly(id, name)}`)
  },
  toPersonEdit(id: number, name?: string) {
    return `${Routing.toPerson(id, name)}/edit`
  },
  toImage(slug: string) {
    return f(`/image/${slug}`)
  },
  toRawImage(image: Image) {
    return `${process.env.NEXT_PUBLIC_BASE_URL_CDN}/${
      image.slug
    }.${image.mimetype.toLowerCase()}`
  },
  toDiscoveredImageDownload(id: number) {
    const params = new URLSearchParams({ discoveredImageId: id.toString() })
    return f(`/api/image/download?${params}`)
  },
}
