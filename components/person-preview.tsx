import React from "react";
import { motion } from "framer-motion";
import { FaceContext } from "@/models/contexts";

export function PersonPortrait({ src, face, index, ...rest }) {
  const ref = React.useRef<HTMLCanvasElement>();
  const { setFace } = React.useContext(FaceContext);
  const width = 100;
  const scale = width / face.width;
  React.useEffect(() => {
    // getCroppedImg(src, crop).then((e) => setBlob(e));
    const image = new Image();
    image.src = src;
    image.onload = () => {
      const ctx = ref.current.getContext("2d");
      ctx.drawImage(
        image,
        face.x,
        face.y,
        face.width,
        face.height,
        0,
        0,
        width,
        Math.round(face.height * scale)
      );
    };
  }, []);
  return (
    <motion.div
      className={`flex flex-col text-xs ${rest.className}`}
      onMouseEnter={() => setFace(index)}
      onMouseLeave={() => setFace(-1)}
    >
      <canvas
        className={`rounded mb-2`}
        width={width}
        height={`${Math.round(face.height * scale)}px`}
        style={{
          height: Math.round(face.height * scale),
          width: 100,
        }}
        ref={(r) => (ref.current = r)}
      ></canvas>
      <p>Cute girl</p>
    </motion.div>
  );
}
