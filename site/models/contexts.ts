import { OneImageQuery } from "@/__generated__/graphql"
import React from "react"

export const FaceContext = React.createContext({
  setFace: (() => {}) as React.Dispatch<React.SetStateAction<string>>,
  face: "",
})

export const ImageContext = React.createContext<OneImageQuery["image"] | null>(
  null
)
