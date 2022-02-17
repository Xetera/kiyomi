import { encodeUriFriendly } from "~/client/data/encoders"
import { Image, UploadDestination } from "@prisma/client"

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
    const imageKey = `${image.slug}.${image.mimetype.toLowerCase()}`
    if (image.destination === UploadDestination.Local) {
      return `${process.env.NEXT_PUBLIC_BASE_URL}/_images/${imageKey}`
    }
    return `${process.env.NEXT_PUBLIC_BASE_URL_CDN}/${imageKey}`
  },
  toDiscoveredImageDownload(id: number) {
    const params = new URLSearchParams({ discoveredImageId: id.toString() })
    return f(`/api/image/download?${params}`)
  },
}
