import { getImage } from "@/lib/data-fetching";
import { transformImage } from "@/lib/transformer";
import { createRouter } from "../trpc/[trpc]";
import { httpError } from "@trpc/server";
import * as z from "zod";

export const imageRouter = createRouter().query("one", {
  input: z.object({
    slug: z.string(),
  }),
  async resolve({ ctx, input }) {
    const data = await getImage(input.slug, ctx.db);
    if (!data) {
      throw httpError.notFound;
    }
    return transformImage(data);
  },
});
