import { PrismaClient, UploadType, User as DatabaseUser } from "@prisma/client"
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/client"
import { prisma as db } from "@/lib/db"
import { FormData, parseFiles } from "./file"
import { User } from "next-auth"
import { getUserFromToken } from "./auth"
import { BackendUser } from "./shared"

export type BaseContext = {
  db: PrismaClient
}

export type Endpoint<T> = Middleware<BaseContext & T>

export type Handler<T> = (
  req: NextApiRequest,
  res: NextApiResponse,
  ctx: BaseContext
) => Promise<T>

export type Middleware<T> = (
  req: NextApiRequest,
  res: NextApiResponse,
  ctx: T
) => Promise<void> | void

export type MiddlewareHandler<T, K> = (
  req: NextApiRequest,
  res: NextApiResponse,
  ctx: T
) => Promise<K> | K

// Unfortunately this doesn't wokr due to typescript's type inference limitations with generic values
export function makeMiddleware<T extends BaseContext, K>(
  middlewareHandler: MiddlewareHandler<T, K>
) {
  return (f: Middleware<T & K>): Middleware<T> => async (req, res, ctx) => {
    try {
      const data = await middlewareHandler(req, res, ctx)
      return f(req, res, { ...ctx, ...data })
    } catch (handlerOrErr) {
      if (typeof handlerOrErr === "function") {
        return handlerOrErr()
      }
      throw handlerOrErr
    }
  }
}

export type CtxSession = { user: BackendUser; contextType: UploadType }

export type CtxUpload = { upload: FormData }

export function withFileUpload<T extends BaseContext>(
  f: Middleware<T & CtxUpload>
): Middleware<T> {
  return async (req, res, ctx) => {
    const upload = await parseFiles(req, res)
    return f(req, res, { ...ctx, upload })
  }
}

export function handle(f: Middleware<BaseContext>): NextApiHandler {
  return async (req, res) => {
    try {
      return await f(req, res, { db })
    } catch (error) {
      res.statusCode = 500
      console.log(error)
      if (error instanceof Error) {
        res.json({ error: error.message })
      } else {
        res.json({ error: "Internal Server Error" })
      }
    }
  }
}
