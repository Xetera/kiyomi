import { z } from "zod"

export const JiuProvider = z.object({
  type: z.string(),
  id: z.string(),
  ephemeral: z.boolean(),
})

export const JiuAccount = z.object({
  name: z.string(),
  avatarUrl: z.string().optional(),
})

export const JiuMedia = z.object({
  type: z.string(),
  mediaUrl: z.string(),
  referenceUrl: z.string().optional(),
  uniqueIdentifier: z.string(),
  metadata: z.unknown(),
})

export const JiuPost = z.object({
  account: JiuAccount,
  uniqueIdentifier: z.string(),
  images: z.array(JiuMedia),
  body: z.string().optional(),
  url: z.string().optional(),
  postDate: z.preprocess((arg) => new Date(arg as string), z.date()).optional(),
  metadata: z.unknown(),
})

export const JiuMessageMetadata = z.object({
  groups: z.array(z.number()).optional(),
  people: z.array(z.number()).optional(),
})

export const JiuMessage = z.object({
  // this is potentially added on the message on requeues
  retries: z.number().optional(),
  provider: JiuProvider,
  posts: z.array(JiuPost),
  metadata: JiuMessageMetadata.nullable(),
})

// export type JiuMessageType = z.infer<typeof JiuMessage>
