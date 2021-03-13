import { handle, withUser } from "@/lib/middleware";
import { imageFindOptions } from "@/lib/data-fetching";
import {
  IMAGES_PER_FETCH,
  ImagesResponse,
  PromiseReturnType,
} from "@/lib/shared";
import { transformImage } from "@/lib/transformer";
import { Prisma, PrismaClient } from "@prisma/client";
import { last } from "lodash";

async function response(db: PrismaClient, cursor?: string) {
  console.log("[SERVER] getting /api/image");
  const result = await db.image.findMany({
    ...imageFindOptions,
    orderBy: {
      createdAt: "desc",
    },
    take: IMAGES_PER_FETCH,

    // we have to do this because of type inference lmfao
    ...(cursor
      ? {
          skip: 1,
          cursor: {
            slug: cursor as string,
          },
        }
      : {}),
  });

  return {
    data: result.map(transformImage),
    cursor: last(result)?.slug ?? null,
  };
}

export type HomeResponse = PromiseReturnType<typeof response>;

export default handle(
  withUser(
    async (req, res, { user, db }) => {
      const { cursor } = req.query;
      const data = await response(db, cursor as string);
      console.log("[SERVER] Responding /api/image");
      res.json(data);
    },
    { strict: false }
  )
);
