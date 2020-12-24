import { PrismaClient } from "@prisma/client";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getSession, Session } from "next-auth/client";
import { prisma as db } from "@/lib/db";
import { FormData, parseFiles } from "./file";
import { User } from "next-auth";
import { getUserFromToken } from "./auth";

export type BaseContext = {
  db: PrismaClient;
};

export type Endpoint<T> = Middleware<BaseContext & T>;

export type Middleware<T> = (
  req: NextApiRequest,
  res: NextApiResponse,
  ctx: T
) => Promise<void> | void;

export type MiddlewareHandler<T, K> = (
  req: NextApiRequest,
  res: NextApiResponse,
  ctx: T
) => Promise<K> | K;

// Unfortunately this doesn't wokr due to typescript's type inference limitations with generic values
export function makeMiddleware<T extends BaseContext, K>(
  middlewareHandler: MiddlewareHandler<T, K>
) {
  return (f: Middleware<T & K>): Middleware<T> => async (req, res, ctx) => {
    try {
      const data = await middlewareHandler(req, res, ctx);
      return f(req, res, { ...ctx, ...data });
    } catch (handlerOrErr) {
      if (typeof handlerOrErr === "function") {
        return handlerOrErr();
      }
      throw handlerOrErr;
    }
  };
}

export type CtxSession = { user: User };

export function withUser<T extends BaseContext>(
  f: Middleware<T & { user?: User }>,
  opts?: { strict: false }
): Middleware<T>;
export function withUser<T extends BaseContext>(
  f: Middleware<T & CtxSession>,
  opts?: { strict: true }
): Middleware<T>;
export function withUser<T extends BaseContext>(
  f: Middleware<T & CtxSession>,
  { strict = true }: { strict: boolean } = { strict: true }
): Middleware<T> {
  return async (req, res, ctx) => {
    const next = (user: User) => {
      console.log(`Got a request from ${user.name}`);
      return f(req, res, { ...ctx, user });
    };
    const error = () => res.status(403).end();
    const auth = req.headers.authorization;
    if (auth) {
      const user = await getUserFromToken(auth, ctx.db);
      return next(user);
    }
    const session = await getSession({ req });
    if (!session && strict) {
      return error();
    }
    return next(session.user);
  };
}

export type CtxUpload = { upload: FormData };

export function withFileUpload<T extends BaseContext>(
  f: Middleware<T & CtxUpload>
): Middleware<T> {
  return async (req, res, ctx) => {
    const upload = await parseFiles(req);
    return f(req, res, { ...ctx, upload });
  };
}

export function handle(f: Middleware<BaseContext>): NextApiHandler {
  return (req, res) => {
    return f(req, res, { db });
  };
}
