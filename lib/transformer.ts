import { Appearance, Face, Image } from "@prisma/client";
import { pick, keyBy } from "lodash";
import {
  GetImage,
  imageFindOptionsAppearanceSelection,
  imageFindOptionsFaceSelection,
} from "./data-fetching";

export const publicImageFields = {
  userId: true,
  slug: true,
  public: true,
  caption: true,
  source: true,
  height: true,
  width: true,
  bytes: true,
  mimetype: true,
  isNsfw: true,
  views: true,
  palette: true,
  createdAt: true,
  updatedAt: true,
} as const;

type ExtraImageProperties = {
  mimetype: string;
  url: string;
};
