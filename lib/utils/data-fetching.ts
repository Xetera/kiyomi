import { Prisma } from "@prisma/client";
import { publicImageFields } from "./transformer";

export function fetcher(url: string, init?: RequestInit) {
  return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`, init).then((r) =>
    r.json()
  );
}

export const imageFindOptions: Partial<Prisma.FindUniqueImageArgs> = {
  select: {
    ...Object.fromEntries(publicImageFields.map((field) => [field, true])),
    tags: true,
    // pHash: false,
    user: {
      select: {
        name: true,
        image: true,
      },
    },
    faces: {
      select: {
        person: true,
        x: true,
        y: true,
        width: true,
        height: true,
      },
    },
  },
};
