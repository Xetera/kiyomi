import { PrismaClient } from "@prisma/client";
import { PromiseReturnType } from "./shared";
import { publicImageFields } from "./transformer";
import { getSdk } from "@/__generated__/request";
import { GraphQLClient } from "graphql-request";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import { getSession } from "next-auth/client";

export const client = new GraphQLClient(
  `${process.env.NEXT_PUBLIC_BASE_URL}/api/internal`
);

export const sdk = getSdk(client);

export const imageFindOptionsFaceSelection = {
  id: true,
  appearanceId: true,
  score: true,
  x: true,
  y: true,
  width: true,
  height: true,
} as const;

export const imageFindOptionsAppearanceSelection = {
  id: true,
  person: true,
  faces: {
    select: {
      ...imageFindOptionsFaceSelection,
    },
  },
} as const;

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
} as const;

export const getImage = (slug: string, db: PrismaClient) => {
  return db.image.findUnique({
    ...imageFindOptions,
    where: { slug },
  });
};

export type ExtraServerSideProps = {};

export type ServerSideProps = (
  ctx: ExtraServerSideProps & GetServerSidePropsContext
) => ReturnType<GetServerSideProps>;

export function wrapRequest<T>(
  f: ServerSideProps
): GetServerSideProps<T & ExtraServerSideProps> {
  return async (ctx) => {
    const { req, res, ...rest } = ctx;

    const session = await getSession(ctx);
    if (req.url?.startsWith("/_next")) {
      return {
        props: { session },
      };
    }
    const data: GetServerSidePropsResult<any> = await f({ req, res, ...rest });
    if (!("props" in data)) {
      // @ts-ignore
      data.props = {};
    }
    // @ts-ignore
    data.props.session = session;
    return data;
  };
}
