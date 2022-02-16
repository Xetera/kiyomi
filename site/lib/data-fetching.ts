import { PrismaClient } from "@prisma/client"
import { publicImageFields } from "./transformer"
import { GraphQLClient } from "graphql-request"
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
  NextPage,
  NextPageContext,
} from "next"
import { getSession } from "next-auth/client"
import { Session } from "next-auth"
import {
  buildPrefetcher,
  buildStaticPrefetcher,
  prefetchQuery,
} from "@/lib/client-helpers"

export const client = new GraphQLClient(
  `${process.env.NEXT_PUBLIC_BASE_URL}/api/internal`
)

export const imageFindOptionsFaceSelection = {
  id: true,
  appearanceId: true,
  score: true,
  x: true,
  y: true,
  width: true,
  height: true,
} as const

export const imageFindOptionsAppearanceSelection = {
  id: true,
  person: true,
  faces: {
    select: {
      ...imageFindOptionsFaceSelection,
    },
  },
} as const

export const imageFindOptions = {
  select: {
    ...publicImageFields,
    tags: {
      select: {
        name: true,
      },
    },
    // pHash: false,
    user: {
      select: {
        name: true,
        image: true,
      },
    },
    faces: {
      select: {
        ...imageFindOptionsFaceSelection,
      },
    },
    appearances: {
      select: {
        ...imageFindOptionsAppearanceSelection,
      },
    },
  },
} as const

export const getImage = (slug: string, db: PrismaClient) => {
  return db.image.findUnique({
    ...imageFindOptions,
    where: { slug },
  })
}

export type ExtraServerSideProps = {
  session?: Session
  prefetch: typeof prefetchQuery
}

export type ServerSideProps = (
  ctx: ExtraServerSideProps & GetServerSidePropsContext
) => ReturnType<GetServerSideProps>

export type CheapServerSideProps<T = any> = (
  // Cheap queries should not be doing any kind of prefetching
  ctx: Omit<ExtraServerSideProps, "prefetch" | "session"> &
    GetServerSidePropsContext
) => GetServerSidePropsResult<T>

export const wrapStatic = (
  f: (
    opts: { prefetch: typeof prefetchQuery } & GetStaticPropsContext
  ) => Promise<GetStaticPropsResult<any>>
) => {
  return async (ctx: GetStaticPropsContext) => {
    const prefetch = buildStaticPrefetcher()
    const data: GetServerSidePropsResult<any> = await f({ prefetch, ...ctx })
    return data
  }
}

export function wrapRequest<T>(
  f: ServerSideProps,
  cheapFetcher?: CheapServerSideProps
): GetServerSideProps<T & ExtraServerSideProps> {
  return async (ctx) => {
    const { req, res, ...rest } = ctx

    if (req.url?.startsWith("/_next")) {
      if (cheapFetcher) {
        return cheapFetcher({ req, res, ...rest })
      }
      return { props: {} }
    }
    const session = (await getSession(ctx)) ?? undefined

    const prefetch = buildPrefetcher(req, res)
    const data: GetServerSidePropsResult<any> = await f({
      req,
      res,
      session,
      prefetch,
      ...rest,
    })
    if (!("props" in data)) {
      // @ts-ignore
      data.props = {}
    }
    // @ts-ignore
    data.props.session = session ?? null
    return data
  }
}
