import { getUserFromToken } from "@/lib/auth"
import { getSession } from "next-auth/client"
import { NextApiRequest, NextApiResponse } from "next"
import { Context } from "./context-type"

type ContextInput = {
  req: NextApiRequest
  res: NextApiResponse
}

export async function contextResolver(
  ctx: ContextInput
): Promise<Context & any> {
  const { req, res } = ctx
  const auth = req.headers.authorization

  if (auth) {
    const user = (await getUserFromToken(auth, ctx.req.prisma)) ?? undefined
    return {
      req,
      res,
      user,
      uploadType: "TOKEN",
      ...ctx.req.services,
    }
  }

  const session = await getSession(ctx)

  return {
    req,
    user: session?.user,
    res,
    session,
    uploadType: "WEBSITE",
    ...ctx.req.services,
  }
}
