import { handle, withUser } from "@/lib/middleware";
import { imageFindOptions } from "@/lib/utils/data-fetching";
import { transformImage } from "@/lib/utils/transformer";

export default handle(
  withUser(
    async (req, res, { db, user }) => {
      if (!user) {
        res.redirect("/api/auth/signin");
        return;
      }
      console.log(user);
      const userImages = await db.image.findMany({
        ...imageFindOptions,
        where: {
          user: {
            email: user.email,
          },
        },
      });

      res.json({
        user,
        images: userImages.map(transformImage),
      });
    },
    { strict: false }
  )
);
