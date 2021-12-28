import { PrismaClient } from "@prisma/client"

export type UploaderOptions = {
  prisma: PrismaClient
}
export function makeUploader({ prisma }: UploaderOptions) {}
