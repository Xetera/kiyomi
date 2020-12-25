import React from "react";

const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.crossOrigin = "anonymous";
    image.src = url;
  });

export const getCroppedImg = async (imageSrc, crop) => {
  const image = (await createImage(imageSrc)) as any;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.setAttribute("crossorigin", "anonymous");

  /* setting canvas width & height allows us to 
    resize from the original image resolution */
  canvas.width = 250;
  canvas.height = 250;

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(blob);
    }, "image/jpeg");
  });
};

export function PersonPortrait({ allPortraitHeights, src, crop, ...rest }) {
  const [blob, setBlob] = React.useState(null);
  const ref = React.createRef<HTMLCanvasElement>();
  const width = 100;
  const scale = width / crop.width;
  React.useEffect(() => {
    // getCroppedImg(src, crop).then((e) => setBlob(e));
    const image = new Image();
    image.src = src;
    image.onload = () => {
      const ctx = ref.current.getContext("2d");
      ctx.drawImage(
        image,
        crop.x,
        crop.y,
        crop.width,
        crop.height,
        0,
        0,
        width,
        Math.round(crop.height * scale)
      );
    };
  }, []);
  // @ts-ignore
  return (
    <>
      <canvas
        className={`rounded ${rest.className}`}
        width="100px"
        height={`${Math.round(crop.height * scale)}px`}
        style={{
          height: Math.round(crop.height.scale),
          width: 100,
        }}
        ref={(r) => (ref.current = r)}
      ></canvas>
      {/* {blob && <img src={blob} />} */}
    </>
  );
}
