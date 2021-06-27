import React from "react"
import { PersonPortrait } from "./person-preview"
import { FaceContext, ImageContext } from "@/models/contexts"
import { CascadeChildren } from "./animations/cascade-children"
import { AnimatePresence, motion } from "framer-motion"
import { useToggle } from "react-use"
import { FaExpand, FaCompress } from "react-icons/fa"
import {
  AppearanceDataFragment,
  FaceDataFragment,
  ImageDataFragment,
} from "@/lib/__generated__/graphql"
import Hr from "./hr"
import { Box, Button, Flex } from "@chakra-ui/react"
import { Text } from "@chakra-ui/layout"

type FaceProps = React.HTMLProps<HTMLDivElement> & {
  image: ImageDataFragment
  appearance?: AppearanceDataFragment
  face: FaceDataFragment
  forceActive: boolean
}

function Face({ appearance, face, style, forceActive }: FaceProps) {
  const { face: activeFace } = React.useContext(FaceContext)
  const motionId = appearance
    ? `appearance:${appearance.id}`
    : `face:${face.id}`
  const active = activeFace === motionId
  return (
    <AnimatePresence>
      {(active || forceActive) && (
        <motion.div
          className="absolute z-2 rounded-t border-2"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          exit={{ opacity: 0 }}
          style={{
            ...style,
            border: "2px solid rgba(26, 42, 56, 0.8)",
          }}
        >
          <div className="w-full h-full absolute">
            <p
              className="absolute top-full w-full text-xs p-1"
              style={{
                background: "rgba(20, 17, 30, 0.8)",
                minWidth: "80px",
              }}
            >
              {appearance ? (
                appearance.person.name
              ) : (
                <i className="text-gray-500">Unknown</i>
              )}
              <div className="text-xs text-gray-400">
                {(face.score * 100).toFixed(2)}%
              </div>
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function ImageDisplay() {
  const image = React.useContext(ImageContext)
  const imageRef = React.useRef<HTMLImageElement | null>()
  const parentRef = React.useRef<HTMLDivElement | null>()
  const { face: activeFace } = React.useContext(FaceContext)
  const [expanded, toggleExpanded] = useToggle(false)
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
  }
  const [active, setActive] = React.useState(false)
  const [loaded, setLoaded] = React.useState(false)
  const facePredictions: any[] = []
  // const { data: facePredictions = [] } = useSWR<PredictionResponse>(
  //   `/api/image/face/${image?.slug}`,
  //   fetcher,
  //   { refreshInterval: 0 }
  // );
  React.useEffect(() => {
    checkSize()
  }, [expanded])

  const [parentSize, setParentSize] = React.useState<DOMRect>(defaults)
  const [imageSize, setImageSize] = React.useState<DOMRect>(defaults)
  function checkSize() {
    const a = parentRef.current?.getBoundingClientRect()
    const b = imageRef.current?.getBoundingClientRect()
    if (a) {
      setParentSize(a)
    }
    if (b) {
      setImageSize(b)
    }
  }

  React.useEffect(() => {
    // seems to be necessary for refs to initialize properly first
    setTimeout(() => {
      checkSize()
    }, 50)
    window.addEventListener("resize", checkSize)
    return () => window.removeEventListener("resize", checkSize)
  }, [])

  React.useEffect(() => {
    if (loaded) {
      checkSize()
    }
  }, [loaded])
  if (!image) {
    return null
  }
  const shouldBeExpandable =
    image.height &&
    image.width &&
    image.height > 1200 &&
    image.height / image.width > 1.2

  function renderFaces(
    faces: FaceDataFragment[],
    appearance?: AppearanceDataFragment
  ) {
    return faces.map((face) => (
      <Face
        forceActive={active}
        appearance={appearance}
        face={face}
        image={image!}
        style={{
          left: (face.x * imageSize.width) / (image?.width ?? 1),
          top: (face.y * imageSize.height) / (image?.height ?? 1),
          width: (face.width * imageSize.width) / (image?.width ?? 1),
          height: (face.height * imageSize.height) / (image?.height ?? 1),
          pointerEvents: "none",
        }}
      />
    ))
  }

  const {
    width: parentWidth,
    height: parentHeight,
  } = parentRef.current?.getBoundingClientRect() ?? { width: 700, height: 800 }

  const MAX_WIDTH = 1200
  const imageMaxHeight = !expanded
    ? "70vh"
    : image!.height! <= 800
    ? image!.height
    : "100%"

  return (
    <div
      className="flex flex-1 flex-col xl:min-w-image lg:min-w-sm"
      style={{
        maxWidth: MAX_WIDTH,
        flexBasis: MAX_WIDTH,
        // width: "100%", // Math.max(MIN_WIDTH, Math.min(image.width, MAX_WIDTH)),
      }}
    >
      <div
        className="relative rounded"
        ref={(r) => (parentRef.current = r)}
        style={{
          maxHeight: imageMaxHeight!,
        }}
      >
        {shouldBeExpandable && (
          <div
            className="absolute right-full height-full mr-2 xl:block hidden rounded cursor-pointer"
            title="Toggle expanded view"
            onClick={(e) => toggleExpanded()}
          >
            <div className="sticky top-0 p-1">
              {expanded ? <FaCompress /> : <FaExpand />}
            </div>
          </div>
        )}
        <div
          className="left-0 right-0 absolute mx-auto pointer-events-none top-0"
          style={{
            maxWidth: image!.width! <= 1200 ? image.width! : "100%",
            width: imageRef.current?.width,
            maxHeight: imageMaxHeight!,
          }}
        >
          {renderFaces(image.unknownFaces)}
          {image.appearances.flatMap((appearance, i) =>
            renderFaces(appearance.faces, appearance)
          )}
        </div>
        {/* @ts-ignore */}
        <img
          ref={(input) => {
            imageRef.current = input
            // onLoad replacement for SSR
            if (!input) {
              return
            }
            const img = input

            const updateFunc = () => {
              setLoaded(true)
            }
            img.onload = updateFunc
            img.onerror = () => {
              updateFunc()
              img.onerror = null
            }
            if (img.complete) {
              updateFunc()
            }
          }}
          src={image.rawUrl}
          onMouseEnter={(_) => setActive(true)}
          onMouseLeave={(_) => setActive(false)}
          {...(loaded ? {} : { width: image.width })}
          height={image.height!}
          style={{
            flexBasis: image.width! <= 1200 ? image.width! : "100%",
            maxHeight: image.height! <= 800 ? image.height! : "100%",
          }}
          className="flex object-contain overflow-hidden m-auto rounded"
        />
      </div>
      {/* <div className="flex items-center w-full mt-4">
        <a
          href={image.rawUrl}
          rel="external nofollower noopener"
          target="_blank"
          className="hover:underline text-sm mr-3 text-gray-400"
        >
          View Original
        </a>
        <Hr className="flex-1" />
      </div> */}
      {/* {(image.appearances?.length > 0 || image.unknownFaces?.length > 0) && (
        <section className="mt-5">
          <Flex mb={3} justifyContent="space-between" flexFlow="row">
            <Flex flexDirection="column">
              <h2 className="text-lg font-semibold">Appearing in this image</h2>
              {image.unknownFaces.length > 0 && (
                <p className="text-xs text-gray-500 mt-1 font-semibold">
                  Unverified faces are faces that have not been linked to a
                  known person.
                </p>
              )}
            </Flex>
          </Flex>
          <CascadeChildren className="grid faces-grid flex-row gap-4">
            {image.unknownFaces?.map((face) => {
              return <PersonPortrait src={image.rawUrl} face={face} />;
            })}
            {image.appearances?.map((appearance) => {
              const [face] = appearance.faces;
              return (
                <PersonPortrait
                  src={image.rawUrl}
                  appearance={appearance}
                  face={face}
                  prediction={
                    face &&
                    facePredictions?.find((f) => f.face === face.id)?.matches[0]
                  }
                />
              );
            })}
          </CascadeChildren>
        </section>
      )} */}
    </div>
  )
}
