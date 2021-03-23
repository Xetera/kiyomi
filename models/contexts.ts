import {
  ImageDataFragment,
  OneImageQuery,
  OneImageQueryResult,
} from "@/lib/__generated__/graphql";
import React from "react";

/**
 * Contexts that determines
 */
export const FaceContext = React.createContext({
  setFace: (() => {}) as React.Dispatch<React.SetStateAction<string>>,
  face: "",
});

export const ImageContext = React.createContext<OneImageQuery["image"] | null>(
  null
);
