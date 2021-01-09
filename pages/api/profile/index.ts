import { handle, withUser } from "@/lib/middleware";
import { imageFindOptions } from "@/lib/data-fetching";
import { transformImage } from "@/lib/transformer";
import { PrismaClient, PromiseReturnType } from "@prisma/client";
import { User } from "next-auth";

async function response(user: User, db: PrismaClient) {
  const userImages = await db.image.findMany({
    ...imageFindOptions,
    orderBy: {
      createdAt: "desc",
    },
    where: {
      user: {
        email: user.email,
      },
    },
  });

  return {
    user,
    images: userImages.map(transformImage),
  };
}

export type ProfileResponse = PromiseReturnType<typeof response>;

export default handle(
  withUser(
    async (req, res, { db, user }) => {
      if (!user) {
        res.redirect("/api/auth/signin");
        return;
      }
      return res.json(await response(user, db));
    },
    { strict: false }
  )
);
