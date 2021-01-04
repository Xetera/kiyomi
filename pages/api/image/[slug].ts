import { BaseContext, handle, Handler, Middleware } from "@/lib/middleware";
import { imageFindOptions } from "@/lib/utils/data-fetching";
import { transformImage } from "@/lib/utils/transformer";
import { PrismaClient, PromiseReturnType } from "@prisma/client";

const response: Handler = async (req, res, { db }) => {
  const { slug } = req.query;
  if (Array.isArray(slug)) {
    res.statusCode = 400;
    return res.end();
  }

  res.json(await response(slug, db));
};

export default handle(async (slug: string, db: PrismaClient) => {
  const data = await db.image.findUnique({
    ...imageFindOptions,
    where: { slug },
  });
  return transformImage(data);
});

export type ImageResponse = PromiseReturnType<typeof response>;
