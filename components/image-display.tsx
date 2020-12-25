import React from "react";
import { Stage, Layer, Image, Rect, Transformer } from "react-konva";
import useImage from "use-image";
import { Palette, PaletteColor } from "./palette-color";
import ReactCrop from "react-image-crop";
import { PersonPortrait } from "./person-preview";

// style={{
//   clipPath: `polygon(${(face.x / image.width) * 100}% ${
//     (face.y / image.height) * 100
//   }%,
//       ${((face.x + face.width) / image.width) * 100}% ${
//     (face.y / image.height) * 100
//   }%,
//       ${((face.x + face.width) / image.width) * 100}%
//       ${((face.y + face.height) / image.height) * 100}%,

//       ${(face.x / image.width) * 100}%
//       ${((face.y + face.height) / image.height) * 100}%
//     )`,
// }}
export default function ImageDisplay({ image }: any) {
  // const [img] = useImage(image.url);
  // const ref = React.useRef<HTMLDivElement>();
  // const [size, setSize] = React.useState({
  //   width: 1200,
  //   height: 800,
  // });
  // const shrinkWidth = size.width / image.width;
  // const shrinkHeight = size.height / image.height;
  // function checkSize() {
  //   const a = ref.current.getBoundingClientRect();
  //   console.log(a);
  //   setSize({
  //     height: a.bottom, // ref.current.offsetHeight * 0.95,
  //     width: a.right, // ref.current.offsetWidth * 0.95,
  //   });
  // }
  // React.useEffect(() => {
  //   checkSize();
  //   console.log
  //   window.addEventListener("resize", checkSize);
  //   return () => window.removeEventListener("resize", checkSize);
  // }, []);
  console.log(image.faces);

  // now you may want to make it visible even on small screens
  // we can just scale it
  // const scaleFactor = Math.min(
  //   size.width / image.width,
  //   size.height / image.height
  // );
  // const scale = { x: scaleFactor, y: scaleFactor };
  // console.log(image, size);
  return (
    <div className="flex flex-1 flex-col w-full overflow-auto">
      {/* <Stage
        height={size.height}
        width={size.width}
        scaleX={scaleFactor}
        scaleY={scaleFactor}
        // offsetX={(-1 * Math.abs(image.width - size.width)) / 4}
        // offsetY={(1 * Math.abs(image.height - size.height)) / 4}
      >
        <Layer>
          <Image image={img} width={image.width} height={image.height} />
          {image.faces.map((face) => (
            <Rect
              zIndex={2}
              stroke="red"
              x={Math.round(face.x)}
              y={Math.round(face.y)}
              height={Math.round(face.height)}
              width={Math.round(face.width)}
            />
          ))}
        </Layer>
      </Stage>
      <noscript>
        <img src={image.url} />
      </noscript> */}
      <img
        src={image.url}
        style={{ objectFit: "contain" }}
        className="h-full overflow-hidden max-w-full max-h-full"
      />
    </div>
  );
}
