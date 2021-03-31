import { PrismaClient } from "@prisma/client";
import { fetcher, PromiseReturnType } from "./shared";
import { publicImageFields } from "./transformer";
import { getSdk } from "@/lib/__generated__/request";
import { GraphQLClient } from "graphql-request";
import React from "react";
import { dehydrate } from "react-query/hydration";

export const client = new GraphQLClient(
  `${process.env.NEXT_PUBLIC_BASE_URL}/api/graphql`
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

export type GetImage = PromiseReturnType<typeof getImage>;
