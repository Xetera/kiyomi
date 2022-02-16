import { buildPrefetcher, prefetchQuery } from "@/lib/client-helpers"
import type { NextPageContext } from "next"
import { getSession } from "next-auth/client"

export const wrapInitialProps = <Ctx, Cheap = Ctx>(
  f: (
    opts: { prefetch: typeof prefetchQuery } & NextPageContext & {
        params: Cheap
      }
  ) => Promise<Ctx>,
  baseCtx: (ctx: NextPageContext) => Cheap | Promise<Cheap>
) => {
  return async (ctx: NextPageContext) => {
    const cheapCtx = await baseCtx(ctx)
    if (ctx.req && ctx.res && typeof window !== "undefined") {
      console.log("server side now")
      const session = (await getSession(ctx)) ?? undefined
      const prefetch = buildPrefetcher(ctx.req, ctx.res)
      let data: Ctx
      data = await f({
        req: ctx.req,
        res: ctx.res,
        prefetch,
        params: cheapCtx,
        ...ctx,
      })
      if (!("props" in data)) {
        // @ts-ignore
        data.props = {}
      }
      // @ts-ignore
      data.props.session = session ?? null
      return data
    } else {
      return {
        props: cheapCtx,
      }
    }
  }
}
