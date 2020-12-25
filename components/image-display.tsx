import React from "react";
import useImage from "use-image";
import { Palette, PaletteColor } from "./palette-color";
import ReactCrop from "react-image-crop";
import { PersonPortrait } from "./person-preview";
import { motion } from "framer-motion";
import { FaceContext } from "@/models/contexts";
import { CascadeChildren } from "./animations/cascade-children";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";

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

function Face({ image, face, style, active }) {
  console.log(face);
  return (
    <div
      className="absolute z-10"
      style={{
        ...style,
        border: active ? "2px solid gray" : "",
      }}
    >
      <div className="w-full h-full absolute">
        {active && (
          <p
            className="absolute top-full w-full text-xs p-1"
            style={{ background: "rgba(0, 0, 0, 0.8)", minWidth: "80px" }}
          >
            {face.person?.name ? (
              face.person.name
            ) : (
              <i className="text-blueGray-500">Unknown</i>
            )}
            <div className="text-xs text-blueGray-400">
              {(face.score * 100).toFixed(2)}%
            </div>
          </p>
        )}
      </div>
    </div>
  );
}

export default function ImageDisplay({ image }: any) {
  const imageRef = React.useRef<HTMLDivElement>();
  const parentRef = React.useRef<HTMLDivElement>();
  const { face: activeFace } = React.useContext(FaceContext);
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const defaults = {
    x: 0,
    y: 0,
    height: 0,
    left: 0,
    right: 0,
    width: 1200,
    bottom: 0,
    top: 0,
    toJSON() {},
  };
  const [active, setActive] = React.useState(false);
  // const [img] = useImage(image.url);
  // const ref = React.useRef<HTMLDivElement>();
  const [parentSize, setParentSize] = React.useState<DOMRect>(defaults);
  const [imageSize, setImageSize] = React.useState<DOMRect>(defaults);
  // const shrinkWidth = size.width / image.width;
  // const shrinkHeight = size.height / image.height;
  function checkSize() {
    const a = parentRef.current.getBoundingClientRect();
    const b = imageRef.current.getBoundingClientRect();
    setParentSize(a);
    setImageSize(b);
  }
  React.useEffect(() => {
    // seems to be necessary for refs to initialize properly first
    setTimeout(() => {
      checkSize();
    }, 50);
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);
  console.log(image.faces);

  // now you may want to make it visible even on small screens
  // we can just scale it
  // const scaleFactor = Math.min(
  //   size.width / image.width,
  //   size.height / image.height
  // );
  // const scale = { x: scaleFactor, y: scaleFactor };
  // console.log(image, size);
  console.log(imageRef.current?.getBoundingClientRect());
  const { width: parentWidth } = parentRef.current?.getBoundingClientRect() ?? {
    width: 800,
  };
  return (
    <div
      className="flex flex-1 flex-col"
      style={{ minWidth: "800px" }}
      ref={(r) => (parentRef.current = r)}
    >
      <div className="relative bg-theme-alt rounded mb-2">
        <div className="left-0 right-0 absolute mx-auto z-10">
          {image.faces.map((face, i) => (
            <Face
              active={imageLoaded && (active || activeFace === i)}
              face={face}
              image={image}
              style={{
                left: (face.x * imageSize.width) / image.width,
                top: (face.y * imageSize.height) / image.height,
                width: (face.width * imageSize.width) / image.width,
                height: (face.height * imageSize.height) / image.height,
                pointerEvents: "none",
              }}
            />
          ))}
        </div>
        <div
          ref={(r) => (imageRef.current = r)}
          className="w-full responsive-image-wrapper"
        >
          <Image
            onMouseEnter={(_) => setActive(true)}
            onMouseLeave={(_) => setActive(false)}
            quality={90}
            src={image.url}
            onLoad={(_) => setImageLoaded(true)}
            width={image.width}
            height={image.height}
            // style={{
            //   maxWidth: image.width <= 870 ? image.width : "100%",
            //   maxHeight: image.height <= 800 ? image.height : "100%",
            // }}
            className="flex object-contain overflow-hidden m-auto rounded"
          />
        </div>
      </div>

      {image.faces.length > 0 && (
        <>
          <h2 className="text-lg font-semibold mb-3 mt-2">
            Appearing in this Image
          </h2>
          <CascadeChildren className="flex flex-wrap flex-row">
            {image.faces?.map((face, i) => (
              <PersonPortrait
                index={i}
                src={image.url}
                face={face}
                className="mr-3 mb-2"
              />
            ))}
          </CascadeChildren>
        </>
      )}
    </div>
  );
}
