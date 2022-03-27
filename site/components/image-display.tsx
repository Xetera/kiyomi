import React from "react"
import { FaceContext, ImageContext } from "@/models/contexts"
import { AnimatePresence, motion } from "framer-motion"
import { useToggle } from "react-use"
import { FaCompress, FaExpand } from "react-icons/fa"
import {
  AppearanceDataFragment,
  FaceDataFragment,
} from "@/lib/__generated__/graphql"
import { Box, Flex, Image, Link } from "@chakra-ui/react"
import { Text } from "@chakra-ui/layout"
import { Routing } from "@/client/routing"
import NextLink from "next/link"
import { personPreferredName } from "@/client/data/person-mappers"

type FaceProps = React.HTMLProps<HTMLDivElement> & {
  appearance?: AppearanceDataFragment
  face: FaceDataFragment
  forceActive: boolean
  noBackground?: boolean
  label: string
}

const BoxAnimate = motion(Box)

export function Face({
  appearance,
  face,
  style,
  forceActive,
  label,
  noBackground,
}: FaceProps) {
  const { face: activeFace } = React.useContext(FaceContext)
  const motionId = appearance
    ? `appearance:${appearance.id}`
    : `face:${face.id}`
  const active = activeFace === motionId
  const fontSize = face.width < 200 ? "11px" : "14px"
  return (
    <AnimatePresence>
      {(active || forceActive) && (
        <BoxAnimate
          position="absolute"
          zIndex={2}
          borderRadius="md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.4,
          }}
          background={
            noBackground
              ? "transparent"
              : "linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.25))"
          }
          boxShadow="inset 0px 0px 1px 1px rgba(255, 255, 255, 0.3)"
          style={{
            ...style,
          }}
        >
          <Box position="absolute" w="full" h="full">
            <Text
              _hover={{
                color: "red",
              }}
              position="absolute"
              top="100%"
              w="full"
              display="flex"
              justifyContent="center"
              fontWeight="medium"
              fontSize={fontSize}
              p={1}
              mt={1}
              borderRadius="md"
              bg="rgba(0, 0, 0, 0.8)"
              minWidth="80px"
            >
              <Box color="gray.100" textAlign="center" maxW="full">
                {label}
              </Box>
            </Text>
          </Box>
        </BoxAnimate>
      )}
    </AnimatePresence>
  )
}

export type ImageWithFacesProps = {
  /**
   * This number is only used to listen to resizes from the parent
   * component
   */
  size: any
  blurred?: boolean
  onLoad?: () => void
  image: {
    url: string
    width?: number
    height?: number
  }
  faces(rect: DOMRect): React.ReactElement
}

export const ImageWithFaces = ({
  image,
  faces,
  onLoad,
  blurred,
  size,
}: ImageWithFacesProps) => {
  // const media = React.useContext(ImageContext)
  const imageRef = React.useRef<HTMLImageElement | null>()
  const parentRef = React.useRef<HTMLDivElement | null>()
  const { face: activeFace } = React.useContext(FaceContext)
  const [expanded, toggleExpanded] = useToggle(false)
  const [loaded, setLoaded] = React.useState(false)
  const recheck = React.useCallback(() => {
    checkSize()
    requestAnimationFrame(recheck)
  }, [])
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
  React.useEffect(() => {
    checkSize()
  }, [])

  const [parentSize, setParentSize] = React.useState<DOMRect>(defaults)
  const [imageSize, setImageSize] = React.useState<DOMRect>(defaults)

  React.useEffect(() => {
    recheck()
    // seems to be necessary for refs to initialize properly first
    setTimeout(() => {
      checkSize()
    }, 100)
    window.addEventListener("resize", checkSize)
    return () => window.removeEventListener("resize", checkSize)
  }, [])

  React.useEffect(() => {
    checkSize()
  }, [size])

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

  const MAX_WIDTH = 1200
  const imageMaxHeight = image!.height! <= 800 ? image!.height : "100%"
  return (
    <Box
      position="relative"
      borderRadius="md"
      className="relative rounded"
      height="100%"
      maxHeight={imageMaxHeight!}
      ref={(r) => (parentRef.current = r)}
    >
      <Box
        left={0}
        right={0}
        position="absolute"
        mx="auto"
        top={0}
        maxWidth={image!.width! <= 1200 ? image.width! : "100%"}
        width={imageRef.current?.width}
        maxHeight={imageMaxHeight}
      >
        {faces(imageSize)}
      </Box>
      {/* @ts-ignore */}
      <Image
        ref={(input) => {
          imageRef.current = input
          // onLoad replacement for SSR
          if (!input) {
            return
          }
          const img = input

          const updateFunc = () => {
            onLoad?.()
            setLoaded(true)
          }
          img.onload = () => {
            updateFunc()
            checkSize()
          }
          img.onerror = () => {
            updateFunc()
            img.onerror = null
          }
          if (img.complete) {
            updateFunc()
          }
        }}
        src={image.url}
        {...(loaded ? {} : { width: image.width })}
        height={"100%"}
        flexBasis={image.width && image.width <= 1200 ? image.width : "100%"}
        maxHeight="min-content"
        display="flex"
        objectFit="contain"
        overflow="hidden"
        m="auto"
        borderRadius="md"
        filter={blurred ? "blur(8px)" : "blur(0px)"}
      />
    </Box>
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
  //   `/api/media/face/${media?.slug}`,
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
    return faces.map((face) => {
      const faceComponent = (
        <Face
          key={face.id}
          forceActive={active}
          appearance={appearance}
          label={
            appearance
              ? appearance.person.preferredAlias?.name ?? appearance.person.name
              : "Unknown"
          }
          face={face}
          style={{
            pointerEvents: "visible",
            left: (face.x * imageSize.width) / (image?.width ?? 1),
            top: (face.y * imageSize.height) / (image?.height ?? 1),
            width: (face.width * imageSize.width) / (image?.width ?? 1),
            height: (face.height * imageSize.height) / (image?.height ?? 1),
          }}
        />
      )
      if (!appearance?.person) {
        return faceComponent
      }
      return (
        <NextLink
          passHref
          href={Routing.toPerson(
            appearance?.person.id,
            personPreferredName(appearance.person)
          )}
        >
          <Link target="_blank">{faceComponent}</Link>
        </NextLink>
      )
    })
  }

  const MAX_WIDTH = 1200
  const imageMaxHeight = !expanded
    ? "80vh"
    : image!.height! <= 800
    ? image!.height
    : "100%"

  const sharedImageProps = {
    display: "flex",
    objectFit: "contain",
    overflow: "hidden",
    m: "auto",
    borderRadius: "md",
  } as const
  return (
    <Flex
      flex={1}
      flexDir="column"
      minW={{ lg: "sm", xl: "800px" }}
      maxWidth={MAX_WIDTH}
      flexBasis={MAX_WIDTH}
    >
      <Box
        position="relative"
        borderRadius="md"
        className="relative rounded"
        maxHeight={imageMaxHeight!}
        ref={(r) => (parentRef.current = r)}
        onMouseEnter={(_) => setActive(true)}
        onMouseLeave={(_) => setActive(false)}
      >
        {shouldBeExpandable && (
          <Box
            position="absolute"
            right="full"
            h="full"
            mr={2}
            display={{ base: "hidden", xl: "block" }}
            cursor="pointer"
            borderRadius="full"
            title="Toggle expanded view"
            onClick={(e) => toggleExpanded()}
          >
            <div className="sticky top-0 p-1">
              {expanded ? <FaCompress /> : <FaExpand />}
            </div>
          </Box>
        )}
        <Box
          left={0}
          right={0}
          position="absolute"
          mx="auto"
          top={0}
          maxWidth={image!.width! <= 1200 ? image.width! : "100%"}
          width={imageRef.current?.width}
          maxHeight={imageMaxHeight}
        >
          {renderFaces(image.unknownFaces)}
          {image.appearances.flatMap((appearance, i) =>
            renderFaces(appearance.faces, appearance)
          )}
        </Box>
        {image.mimetype === "MP4" ? (
          <Box
            {...sharedImageProps}
            as="video"
            autoPlay
            loop
            playsInline
            muted
            controls
          >
            <source src={image.rawUrl} />
          </Box>
        ) : (
          <Image
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
            {...(loaded ? {} : { width: image.width })}
            height={image.height!}
            flexBasis={image.width! <= 1200 ? image.width! : "100%"}
            maxHeight={image.height! <= 800 ? image.height! : "100%"}
            {...sharedImageProps}
          />
        )}
      </Box>
    </Flex>
  )
}
