import {
  createClient,
  FaceRequest,
  ImageRequest,
  QueryRequest,
} from "./backend"

export const backend = createClient({
  url: process.env.API_URL,
  headers: {
    Authorization: `Bearer ${process.env.API_AUTHORIZATION}`,
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
