import { handle, withUser } from "@/lib/middleware";
import { imageFindOptions } from "@/lib/utils/data-fetching";
import { transformImage } from "@/lib/utils/transformer";
import { Prisma } from "@prisma/client";

export default handle(
  withUser(
    async (req, res, { user, db }) => {
      const { cursor } = req.query;
      const opts: Prisma.FindManyImageArgs = {
        ...imageFindOptions,
        orderBy: {
          createdAt: "desc",
        },
        take: 40,
      };

      if (cursor) {
        opts.cursor = {
          slug: cursor as string,
        };
      }

      const result = await db.image.findMany(opts);
      res.json(result.map(transformImage));
    },
    { strict: false }
  )
);
