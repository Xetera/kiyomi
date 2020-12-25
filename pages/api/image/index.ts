import { handle, withUser } from "@/lib/middleware";
import { transformImage } from "@/lib/utils/transformer";

export default handle(
  withUser(
    async (req, res, { user, db }) => {
      const result = await db.image.findMany();
      res.json(result.map(transformImage));
    },
    { strict: false }
  )
);
