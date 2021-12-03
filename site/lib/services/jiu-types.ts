import { z } from "zod"

export const JiuProvider = z.object({
  type: z.string(),
  id: z.string(),
  ephemeral: z.boolean(),
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

// export type JiuMessageType = z.infer<typeof JiuMessage>
