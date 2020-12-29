import { handle, withUser } from "@/lib/middleware";
import { imageFindOptions } from "@/lib/utils/data-fetching";
import { IMAGES_PER_FETCH, ImageResponse } from "@/lib/utils/shared";
import { transformImage } from "@/lib/utils/transformer";
import { Prisma } from "@prisma/client";

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

      const result = await db.image.findMany(opts);
      res.json({
        data: result.map(transformImage),
        cursor: result.length > 0 ? result[result.length - 1].slug : null,
      } as ImageResponse);
    },
    { strict: false }
  )
);
