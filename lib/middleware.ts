import { PrismaClient, UploadType, User as DatabaseUser } from "@prisma/client";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getSession, Session } from "next-auth/client";
import { prisma as db } from "@/lib/db";
import { FormData, parseFiles } from "./file";
import { User } from "next-auth";
import { getUserFromToken } from "./auth";
import { BackendUser } from "./shared";

export type BaseContext = {
  db: PrismaClient;
};

export type Endpoint<T> = Middleware<BaseContext & T>;

export type Handler<T> = (
  req: NextApiRequest,
  res: NextApiResponse,
  ctx: BaseContext
) => Promise<T>;

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

export type CtxSession = { user: BackendUser; contextType: UploadType };

export function withUser<T extends BaseContext>(
  f: Middleware<T & { user?: DatabaseUser | null; contextType: UploadType }>,
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
    const next = (user?: User | null, opts?: { contextType: UploadType }) => {
      console.log(`Got a request from ${user ? user.name : "Anonymous User"}`);
      return f(req, res, {
        ...ctx,
        contextType: opts?.contextType ?? "TOKEN",
        user: user as DatabaseUser,
      });
    };

    const error = () => {
      return res.status(403).json({ error: "Forbidden" });
    };

    const auth = req.headers.authorization;

    if (auth) {
      const user = await getUserFromToken(auth, ctx.db);
      if (!user && strict) {
        return error();
      }
      return next(user, { contextType: "TOKEN" });
    }

    const session = await getSession({ req });

    if (!session && strict) {
      return error();
    }

    console.log(session?.user);

    return next(session?.user, { contextType: "WEBSITE" });
  };
}

export type CtxUpload = { upload: FormData };

export function withFileUpload<T extends BaseContext>(
  f: Middleware<T & CtxUpload>
): Middleware<T> {
  return async (req, res, ctx) => {
    const upload = await parseFiles(req, res);
    return f(req, res, { ...ctx, upload });
  };
}

export function handle(f: Middleware<BaseContext>): NextApiHandler {
  return async (req, res) => {
    try {
      return await f(req, res, { db });
    } catch (error) {
      res.statusCode = 500;
      console.log(error);
      res.json({ error });
    }
  };
}
