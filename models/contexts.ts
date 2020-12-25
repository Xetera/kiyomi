import React from "react";

/**
 * Contexts that determines
 */
export const FaceContext = React.createContext({
  setFace: (() => {}) as React.Dispatch<React.SetStateAction<number>>,
  face: -1,
});
