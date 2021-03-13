import { handle, Handler, Middleware } from "@/lib/middleware";
import { getImage } from "@/lib/data-fetching";
import { transformImage } from "@/lib/transformer";
import { PrismaClient, PromiseReturnType } from "@prisma/client";

const response = async (slug: string, db: PrismaClient) => {
  const data = await getImage(slug, db);
  return transformImage(data);
};

export default handle(async (req, res, { db }) => {
  console.log("[SERVER] /api/image/[slug]");
  const { slug } = req.query;
  if (Array.isArray(slug)) {
    res.statusCode = 400;
    return res.end();
  }

  const resp = await response(slug, db);
  console.log(resp);
  res.json(resp);
});

export type ImageResponse = PromiseReturnType<typeof response>;
