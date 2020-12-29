import { findClosestMatchingPerson } from "@/lib/face-recognition";
import { handle } from "@/lib/middleware";

export default handle(async (req, res, { db }) => {
  const image = await db.image.findUnique({
    where: { slug: req.query.slug as string },
    include: {
      faces: {
        select: {
          id: true,
        },
      },
    },
  });
  const result = await findClosestMatchingPerson(
    image.faces.map((face) => face.id),
    {
      db,
      findCount: 5,
    }
  );
  res.json(result);
});
