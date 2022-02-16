import { getUserFromToken } from "@/lib/auth"
import { getSession } from "next-auth/client"
import { NextApiResponse } from "next"
import { Context } from "./context-type"
import { IncomingMessage, ServerResponse } from "http"

type ContextInput = {
  req?: IncomingMessage
  res?: ServerResponse
}

export async function contextResolver(
  ctx: ContextInput
): Promise<Context & any> {
  const { req, res } = ctx
  const auth = req?.headers.authorization

  if (auth) {
    const user = ctx.req
      ? (await getUserFromToken(auth, ctx.req.prisma)) ?? undefined
      : undefined
    return {
      req,
      res,
      user,
      uploadType: "TOKEN",
      ...ctx.req?.services,
    }
  }

  const session = await getSession(ctx)
  let user = session
    ? await ctx.req?.services.prisma.user.findUnique({
        where: { id: session.user.id },
        include: { roles: true },
      })
    : undefined

  return {
    req,
    user: user ?? undefined,
    res,
    session,
    uploadType: "WEBSITE",
    ...ctx.req?.services,
  }
}
