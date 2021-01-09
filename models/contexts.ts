import type { ImageResponse } from "@/pages/api/image/[slug]";
import React from "react";

/**
 * Contexts that determines
 */
export const FaceContext = React.createContext({
  setFace: (() => {}) as React.Dispatch<React.SetStateAction<string>>,
  face: "",
});

export type ImageFace = ImageResponse["unknownFaces"][0];

export type ImageAppearance = ImageResponse["appearances"][0];

export type ImagePerson = ImageAppearance["person"];

export const ImageContext = React.createContext<ImageResponse>(null);
