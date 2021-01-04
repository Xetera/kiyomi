import { Appearance, Face } from "@prisma/client";

export type MatchedFaces = {
  appearance?: Appearance;
  faces: Face[];
};

export function createFaces(appearance: Appearance[]) {
  //   appearance[0].addedBy;
}
