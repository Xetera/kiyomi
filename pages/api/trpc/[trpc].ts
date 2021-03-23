import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/dist/adapters/next";
import { inferAsyncReturnType } from "@trpc/server";
import * as z from "zod";
import { prisma as db } from "@/lib/db";
import { imageRouter } from "../image/[slug]";
import { getUserFromToken } from "@/lib/auth";
import { User } from "next-auth";
import { getSession } from "next-auth/client";

export async function createContext(opts?: trpcNext.CreateNextContextOptions) {
  const auth = opts?.req.headers.authorization;

  let user: User | undefined;
  let uploadType: "TOKEN" | "WEBSITE" = "WEBSITE";
  if (auth) {
    user = await getUserFromToken(auth, db);
    uploadType = "TOKEN";
    return {
      req: opts?.req,
      res: opts?.res,
      db,
      user,
      uploadType,
    };
  }

  const session = await getSession({ req: opts?.req });
  console.log({ session });

  return {
    req: opts?.req,
    res: opts?.res,
    session,
    db,
  };
}
type Context = inferAsyncReturnType<typeof createContext>;

export function createRouter() {
  return trpc.router<Context>();
}
// Important: only use this export with SSR/SSG
export const appRouter = createRouter()
  // Create procedure at path 'hello'
  .query("hello", {
    // using zod schema to validate and infer input values
    input: z
      .object({
        text: z.string().optional(),
      })
      .optional(),
    resolve({ input }) {
      // the `input` here is parsed by the parser passed in `input` the type inferred
      return {
        greeting: `hello ${input?.text ?? "world"}`,
      };
    },
  })
  .merge("image.", imageRouter);

// Exporting type _type_ AppRouter only exposes types that can be used for inference
// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-8.html#type-only-imports-and-export
export type AppRouter = typeof appRouter;

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
});
