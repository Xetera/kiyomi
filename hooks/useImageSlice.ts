import { FaceDataFragment, Maybe } from "@/lib/__generated__/graphql";
import React from "react";

export default function useImageSlice({
  src,
  face,
  height,
}: {
  face?: Maybe<FaceDataFragment>;
  src: string;
  height: number;
}) {
  const ref = React.useRef<HTMLCanvasElement | null>();
  const scale = face ? height / face.height : 1;
  const widthScale = face ? Math.round(face.width * scale) : 1;
  const heightScale = height;
  React.useEffect(() => {
    if (!face) {
      return;
    }
    const image = new Image();
    image.src = src;
    image.onload = () => {
      const ctx = ref.current?.getContext("2d");
      ctx?.drawImage(
        image,
        face.x,
        face.y,
        face.width,
        face.height,
        0,
        0,
        widthScale,
        heightScale
      );
    };
  }, []);
  if (!face) {
    return null;
  }
  return { widthScale, heightScale, ref };
}
