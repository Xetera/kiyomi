import { z } from "zod"

export const JiuProvider = z.object({
  type: z.string(),
  id: z.string(),
  ephemeral: z.boolean(),
  official: z.boolean().default(false),
})

export const JiuAccount = z.object({
  name: z.string(),
  avatarUrl: z.string().nullish(),
})

export const JiuMedia = z.object({
  type: z.string(),
  mediaUrl: z.string(),
  referenceUrl: z.string().nullish(),
  uniqueIdentifier: z.string(),
  metadata: z.unknown(),
})

export const JiuPost = z.object({
  account: JiuAccount,
  uniqueIdentifier: z.string(),
  images: z.array(JiuMedia),
  body: z.string().nullish(),
  url: z.string().nullish(),
  postDate: z.preprocess((arg) => new Date(arg as string), z.date()).nullish(),
  metadata: z.unknown(),
})

export const JiuMessageMetadata = z.object({
  groups: z.array(z.number()).nullish(),
  people: z.array(z.number()).nullish(),
})

export const JiuMessage = z.object({
  // this is potentially added on the message on requeues
  retries: z.number().optional(),
  provider: JiuProvider,
  posts: z.array(JiuPost),
  metadata: JiuMessageMetadata.nullable(),
})

export interface JiuStats {
  name: string
  destination: string
  enabled: boolean
  url: string
  priority: number
  tokens: number
  createdAt: Date | null
  defaultName: string | null
  official: boolean
  lastScrape: Date | null
  lastPost: Date | null
  discoveredImages: number
  scrapeCount: number
}

const JiuAddProviderMetadata = z.object({
  groups: z.array(z.number()),
  people: z.array(z.number()),
})

const JiuAddProvider = z.object({
  url: z.string().url(),
  name: z.string(),
  official: z.boolean(),
  metadata: JiuAddProviderMetadata.nullish(),
  add_to_amqp: z.boolean(),
})

export type JiuAddProvider = z.infer<typeof JiuAddProvider>
