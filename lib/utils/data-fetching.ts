import { Prisma } from "@prisma/client";
import { publicImageFields } from "./transformer";

export const imageFindOptions: Partial<Prisma.FindUniqueImageArgs> = {
  select: {
    ...Object.fromEntries(publicImageFields.map((field) => [field, true])),
    tags: {
      select: {
        name: true,
      },
    },
    // pHash: false,
    user: {
      select: {
        name: true,
        image: true,
      },
    },
    faces: {
      select: {
        id: true,
        score: true,
        person: true,
        x: true,
        y: true,
        width: true,
        height: true,
      },
    },
  },
};
