import { handle, withUser } from "@/lib/middleware";
import { imageFindOptions } from "@/lib/utils/data-fetching";
import { IMAGES_PER_FETCH, ImagesResponse } from "@/lib/utils/shared";
import { transformImage } from "@/lib/utils/transformer";
import { Prisma, PrismaClient, PromiseReturnType } from "@prisma/client";

async function response(opts: Prisma.FindManyImageArgs, db: PrismaClient) {
  const result = await db.image.findMany(opts);
  return {
    data: result.map(transformImage),
    cursor: result.length > 0 ? result[result.length - 1].slug : null,
  };
}

export type HomeResponse = PromiseReturnType<typeof response>;

export default handle(
  withUser(
    async (req, res, { user, db }) => {
      console.log("[SERVER] getting /api/image");
      const { cursor } = req.query;
      const opts: Prisma.FindManyImageArgs = {
        ...imageFindOptions,
        orderBy: {
          createdAt: "desc",
        },
        take: IMAGES_PER_FETCH,
      };

      if (cursor) {
        // skipping the cursor
        opts.skip = 1;
        opts.cursor = {
          slug: cursor as string,
        };
      }
      res.json(await response(opts, db));
    },
    { strict: false }
  )
);
