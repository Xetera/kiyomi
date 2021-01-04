import { ImageResponse } from "@/pages/api/image/[slug]";
import React from "react";

/**
 * Contexts that determines
 */
export const FaceContext = React.createContext({
  setFace: (() => {}) as React.Dispatch<React.SetStateAction<number>>,
  face: -1,
});

export const ImageContext = React.createContext<ImageResponse>(null);
