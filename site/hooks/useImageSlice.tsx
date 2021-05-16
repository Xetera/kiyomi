import { FaceDataFragment, Maybe } from "@/__generated__/graphql";
import React from "react";

type UseImageSliceOptions = {
  face?: Maybe<FaceDataFragment>;
  src: string;
  height: number;
};

export default function useImageSlice({
  src,
  face,
  height,
}: UseImageSliceOptions) {
  const ref = React.useRef<HTMLCanvasElement | null>();
  const scale = face ? height / face.height : 1;
  const widthScale = face ? Math.round(face.width * scale) : 1;
  const heightScale = height;
  React.useEffect(() => {
    if (!face) {
      console.log(`Face was not given for ${src}!`);
      return;
    }
    const image = new Image();
    image.src = src;
    image.onload = () => {
      const ctx = ref.current?.getContext("2d");
      ctx!.clearRect(
        0,
        0,
        ref.current?.width ?? 100,
        ref.current?.height ?? 100
      );
      ctx!.drawImage(
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
  }, [height]);
  if (!face) {
    return null;
  }
  return { widthScale, heightScale, ref };
}

type UseImageSliceCanvasOptions = UseImageSliceOptions &
  React.CanvasHTMLAttributes<HTMLCanvasElement>;

export function useImageSliceCanvas(opts: UseImageSliceCanvasOptions) {
  const { src, face, height, ...rest } = opts;
  const faceSlice = useImageSlice({ src, face, height });
  if (!faceSlice) {
    return null;
  }
  return (
    <canvas
      className="overflow-hidden"
      width={`${faceSlice.widthScale}px`}
      style={{
        height: faceSlice.heightScale,
        width: faceSlice.widthScale,
      }}
      ref={(r) => (faceSlice.ref.current = r)}
      height={faceSlice.heightScale}
      {...rest}
    ></canvas>
  );
}
