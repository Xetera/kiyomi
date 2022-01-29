import { Box, BoxProps, Flex, forwardRef, Image, Text } from "@chakra-ui/react"
import React from "react"
import type { FocusableImage } from "@/components/data-grids/generic-grid-element"
import { focusToObjectPosition } from "@/components/data-grids/generic-grid-element"
import { Maybe } from "@/lib/__generated__/graphql"

export type PortraitProps = {
  focus?: Maybe<FocusableImage>
  opacity: number
  onClick?: () => void
  src?: string
  name?: React.ReactNode
  width?: BoxProps["width"]
  height?: BoxProps["height"]
}

export const Portrait = forwardRef<PortraitProps, "div">(
  ({ opacity, onClick, focus, src, name, width, height, ...rest }, ref) => {
    const objectPosition = focus ? focusToObjectPosition(focus) : ""
    return (
      <Flex
        flexDir="column"
        transition="all 0.4s ease-in-out"
        opacity={opacity}
        _hover={{
          opacity: "100%",
        }}
        {...rest}
        ref={ref}
      >
        <Box
          mx="auto"
          width={width}
          height={height}
          zIndex={1}
          borderRadius={"lg"}
          overflow="hidden"
          cursor="pointer"
          background="black"
          onClick={onClick}
        >
          <Image
            objectFit="cover"
            objectPosition={objectPosition}
            h="full"
            w="full"
            overflow="hidden"
            src={
              src ?? "https://placewaifu.com/image/250/320"
              // trend.avatar
              //   ? trend.avatar.thumbnail.small
              //   : "https://placewaifu.com/image/200/320"
            }
          />
        </Box>
        <Text textStyle="heading-sm" color="text.100" textAlign="center">
          {name}
        </Text>
      </Flex>
    )
  }
)
