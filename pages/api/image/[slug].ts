import { handle } from "@/lib/middleware";
import { imageFindOptions } from "@/lib/utils/data-fetching";
import { transformImage } from "@/lib/utils/transformer";

export default handle(async (req, res, { db }) => {
  const { slug } = req.query;
  if (Array.isArray(slug)) {
    res.statusCode = 400;
    return res.end();
  }
  const data = await db.image.findUnique({
    ...imageFindOptions,
    where: { slug },
  });
  res.json(transformImage(data));
});
