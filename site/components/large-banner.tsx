import { Box, forwardRef, Image } from "@chakra-ui/react"
import { focusToObjectPosition } from "@/components/image-grid-element"
import React from "react"

const magicGradient =
  "linear-gradient(to bottom, black 0%, rgba(0, 0, 0, 0.908) 0%, rgba(0, 0, 0, 1) 19%, rgba(0, 0, 0, 0.841) 34%, rgba(0, 0, 0, 0.782) 47%, rgba(0, 0, 0, 0.498) 56.5%, rgba(0, 0, 0, 0.324) 65%, rgba(0, 0, 0, 0.256) 73%, rgba(0, 0, 0, 0.135) 80.2%, rgba(0, 0, 0, 0.102) 86.1%, rgba(0, 0, 0, 0.051) 91%, rgba(0, 0, 0, 0.015) 95.2%, rgba(0, 0, 0, 0.010) 98.2%, transparent 100%);"

const DEFAULT_HEIGHT = ["30vh", "40vh", "55vh", "65vh"]

export const LargeBanner = forwardRef(
  ({ url, height = DEFAULT_HEIGHT, ...rest }, ref) => {
    return (
      <Box mb={3} height={height} display="flex" opacity={0.2}>
        <Image
          maxHeight="90vh"
          top={0}
          zIndex={-1}
          draggable="false"
          userSelect="none"
          position="absolute"
          objectFit="cover"
          width="100%"
          src={url}
          sx={{ WebkitMaskImage: magicGradient }}
          {...rest}
          ref={ref}
        />
      </Box>
    )
  }
)
