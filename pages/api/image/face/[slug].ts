import { findClosestMatchingPerson } from "@/lib/face-recognition";
import { handle } from "@/lib/middleware";
import { PromiseReturnType } from "@/lib/shared";
import { PrismaClient } from "@prisma/client";

async function response(slug: string, db: PrismaClient) {
  const image = await db.image.findUnique({
    where: { slug },
    include: {
      faces: {
        select: {
          id: true,
        },
      },
    },
  });
  return findClosestMatchingPerson(
    image.faces.map((face) => face.id),
    {
      db,
      findCount: 5,
    }
  );
}

export type PredictionResponse = PromiseReturnType<typeof response>;

export default handle(async (req, res, { db }) => {
  const result = await response(req.query.slug as string, db);
  console.log(result);
  res.json(result ?? []);
});
