import { Prisma } from "@prisma/client";
import { publicImageFields } from "./transformer";

export const imageFindOptions = {
  select: {
    ...publicImageFields,
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
    apperances: {
      select: {
        person: true,
        faces: {
          select: {
            id: true,
            score: true,
            x: true,
            y: true,
            width: true,
            height: true,
          },
        },
      },
    },
  },
} as const;
