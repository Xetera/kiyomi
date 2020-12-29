import React from "react";
import { motion } from "framer-motion";
import { FaceContext } from "@/models/contexts";
import {
  RiLightbulbFlashLine,
  RiEdit2Line,
  RiDeleteBinLine,
} from "react-icons/ri";
import PerfectScrollbar from "react-perfect-scrollbar";

function ActionButton({ icon, className }) {
  return <div className={`p-1 ${className} flex items-start`}>{icon}</div>;
}

export const maxPortraitHeight = 140;

export function PersonPortrait({ src, face, index, prediction, ...rest }) {
  console.log("face", face);
  const ref = React.useRef<HTMLCanvasElement>();
  const { setFace } = React.useContext(FaceContext);
  const height = maxPortraitHeight;
  const maxWidth = 100;
  const scale = height / face.height;
  const widthScale = Math.round(face.width * scale);
  const heightScale = height;
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
        widthScale,
        heightScale
      );
    };
  }, []);
  const predictionScore = prediction?.predictionScore
    ? `${prediction.predictionScore.toFixed(2)}%`
    : "None";
  return (
    <motion.div
      className={`rounded overflow-hidden whitespace-nowrap flex flex-row text-xs ${rest.className} bg-theme-alt cursor-pointer border-theme-light`}
      style={{
        borderWidth: "1px",
        height,
      }}
      onMouseEnter={() => setFace(index)}
      onMouseLeave={() => setFace(-1)}
    >
      <div
        className="overflow-hidden object-cover flex flex-col items-center"
        style={{ maxWidth }}
      >
        <canvas
          className="overflow-hidden"
          width={`${widthScale}px`}
          height={heightScale}
          style={{
            height: heightScale,
            width: widthScale,
          }}
          ref={(r) => (ref.current = r)}
        ></canvas>
      </div>
      <div className="w-full flex flex-col flex-1 overflow-hidden">
        <h2
          className="font-semibold text-sm px-3 py-2 border-theme-light flex justify-between"
          style={{
            borderBottomWidth: "1px",
          }}
        >
          <p
            className={`overflow-hidden overflow-ellipsis ${
              !face.person ? "text-blueGray-500" : ""
            }`}
          >
            {face.person?.name ?? "Unverified"}
          </p>
          <div className="flex">
            <ActionButton
              icon={<RiEdit2Line />}
              className="text-blue-400 hover:bg-theme-light rounded"
            />
            <ActionButton
              icon={<RiDeleteBinLine />}
              className="text-red-400 hover:bg-theme-light rounded"
            />
          </div>
        </h2>
        <div className="flex flex-col justify-between h-full overflow-hidden">
          <PerfectScrollbar className="px-3 py-2 flex-1 overflow-hidden whitespace-normal">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic
            {/* {prediction?.person?.description ?? (
                <div className="flex flex-row">
                  <i className="text-blueGray-600">No description</i>
                </div>
              )} */}
          </PerfectScrollbar>
          <div className="px-3 py-2 flex w-full flex-row justify-between items-end text-blueGray-500">
            <div>
              <p
                className="flex items-center font-semibold"
                data-tip="This is a prediction made by the website"
              >
                <RiLightbulbFlashLine className="mr-1" />
                {prediction?.person?.name ?? "None"}
              </p>
            </div>
            <p className="">{predictionScore}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
