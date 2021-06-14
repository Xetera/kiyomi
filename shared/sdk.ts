import { createClient, FaceRequest, ImageRequest } from "./backend"

if (!process.env.API_AUTHORIZATION && !process.env.NEXT_PUBLIC_BASE_URL) {
  throw Error(`API_AUTHORIZATION or NEXT_PUBLIC_BASE_URL is not defined`)
}

export const backend = createClient({
  url: process.env.API_URL,
  headers: {
    Authorization: `${process.env.API_AUTHORIZATION}`,
  },
})

export const client = createClient({
  url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/graphql`,
})

export const FaceData: Partial<FaceRequest> = {
  id: true,
  x: true,
  y: true,
  width: true,
  height: true,
  score: true,
}

export const ImageData: Partial<ImageRequest> = {
  id: true,
  height: true,
  width: true,
  isNsfw: true,
  url: true,
  rawUrl: true,
  createdAt: true,
  caption: true,
  public: true,
  source: true,
  slug: true,
  bytes: true,
  mimetype: true,
  palette: true,
  tags: {
    name: true,
  },
}
