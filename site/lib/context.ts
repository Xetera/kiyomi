import { prisma } from "@/lib/db"
import { getUserFromToken } from "@/lib/auth"
import { getSession } from "next-auth/client"
import { amqpPromise } from "@/lib/amqp"
import { NextApiRequest, NextApiResponse } from "next"
import { Context } from "./context-type"
import { getServices } from "@/lib/services"

type ContextInput = {
  req: NextApiRequest
  res: NextApiResponse
}

export async function contextResolver(
  ctx: ContextInput
): Promise<Context & any> {
  const { req, res } = ctx
  const auth = req.headers.authorization
  const amqp = await amqpPromise.catch(() => undefined)
  const services = await getServices()

  if (auth) {
    const user = (await getUserFromToken(auth, prisma)) ?? undefined
    return {
      req,
      res,
      amqp,
      prisma,
      user,
      uploadType: "TOKEN",
      ...services,
    }
  }

  const session = await getSession(ctx)

  return {
    req,
    user: session?.user,
    amqp,
    res,
    session,
    uploadType: "WEBSITE",
    prisma,
  }
}
