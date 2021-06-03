import React from "react"
import { motion } from "framer-motion"
import { FaceContext } from "@/models/contexts"
import {
  RiLightbulbFlashLine,
  RiEdit2Line,
  RiDeleteBinLine,
} from "react-icons/ri"
import PerfectScrollbar from "react-perfect-scrollbar"
import { FaceDataFragment, Maybe, OneImageQuery } from "@/__generated__/graphql"
import useImageSlice from "@/hooks/useImageSlice"

function ActionButton({ icon, className }) {
  return <div className={`p-1 ${className} flex items-start`}>{icon}</div>
}

type PortraitProps = React.HTMLProps<HTMLDivElement> & {
  src: string
  appearance?: Maybe<NonNullable<OneImageQuery["image"]>["appearances"][number]>
  face?: Maybe<FaceDataFragment>
  prediction?: any // PredictionResponse[0]["matches"][0];
}

export const maxPortraitHeight = 140

export function PersonPortrait({
  src,
  appearance,
  face,
  prediction,
  className,
}: PortraitProps) {
  const faceSlice = useImageSlice({
    src,
    height: maxPortraitHeight,
    face,
  })
  const { setFace } = React.useContext(FaceContext)
  const height = maxPortraitHeight
  const maxWidth = 100
  const scale = face ? height / face.height : 1
  const predictionScore = prediction?.predictionScore
    ? `${prediction.predictionScore.toFixed(2)}%`
    : "None"

  const motionId = appearance
    ? `appearance:${appearance.id}`
    : face
    ? `face:${face.id}`
    : ""
  return (
    <motion.div
      className={`rounded overflow-hidden whitespace-nowrap flex flex-row text-xs ${className} cursor-pointer border-theme-subtle`}
      style={{
        borderWidth: "1px",
        height,
      }}
      onMouseEnter={() => setFace(motionId)}
      onMouseLeave={() => setFace("")}
    >
      <div
        className="overflow-hidden object-cover flex flex-col items-center"
        style={{ maxWidth }}
      >
        {faceSlice && (
          <canvas
            className="overflow-hidden"
            width={`${faceSlice.widthScale}px`}
            height={faceSlice.heightScale}
            style={{
              height: faceSlice.heightScale,
              width: faceSlice.widthScale,
            }}
            ref={(r) => (faceSlice.ref.current = r)}
          ></canvas>
        )}
      </div>
      <div className="w-full flex flex-col flex-1 overflow-hidden">
        <h2
          className="font-semibold text-sm px-3 py-2 border-theme-subtle flex justify-between"
          style={{
            borderBottomWidth: "1px",
          }}
        >
          <p
            className={`overflow-ellipsis ${
              !appearance ? "text-gray-300" : ""
            }`}
          >
            {appearance?.person.name ?? <i>Unverified</i>}
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
          <PerfectScrollbar className="px-3 py-2 flex-1 overflow-hidden whitespace-normal text-gray-400">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic
          </PerfectScrollbar>
          <div className="px-3 py-2 flex w-full flex-row justify-between items-end text-gray-400">
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
  )
}
