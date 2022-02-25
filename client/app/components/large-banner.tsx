import { Box, forwardRef, Image } from "@chakra-ui/react"
import {
  FocusableImage,
  focusToObjectPosition,
} from "~/components/data-grids/generic"
import React from "react"
import { magicGradient } from "~/client/jsx-helpers"

const DEFAULT_HEIGHT = ["30vh", "40vh", "55vh", "65vh"]

export const LargeBanner = forwardRef<
  {
    src: string
    gradient?: string
    focus?: FocusableImage
    height?: string | string[]
    objectPosition?: string
  },
  "div"
>(({ src, height, focus, gradient, ...rest }, ref) => {
  const objectPosition = focus ? focusToObjectPosition(focus) : ""
  return (
    <Box
      mb={3}
      display="flex"
      opacity={0.2}
      height={["14vh", "20vh", "20vh"]}
      {...rest}
    >
      <Image
        maxHeight="90vh"
        top={0}
        zIndex={-1}
        height={height ?? "100%"}
        draggable="false"
        userSelect="none"
        position="absolute"
        objectFit="cover"
        objectPosition={rest.objectPosition}
        width="100%"
        src={src}
        sx={{ WebkitMaskImage: gradient ?? magicGradient }}
        ref={ref}
      />
    </Box>
  )
})
