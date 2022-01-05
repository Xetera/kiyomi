import { Box, Flex, forwardRef, Grid, Text } from "@chakra-ui/react"
import format from "date-fns/format"
import React from "react"
import {
  FocusableImage,
  GenericGridElement,
  HrefOrOnclick,
} from "./generic-grid-element"
import {
  Image as ImageData,
  Person,
  Thumbnail,
} from "@/lib/__generated__/graphql"

export type DisplayableGridImage = Pick<ImageData, "createdAt" | "id"> &
  HrefOrOnclick & { aspectRatio?: number } & FocusableImage & {
    thumbnail: Pick<Thumbnail, "small">
    appearances?: Array<{
      person: Pick<Person, "name">
    }>
  }

export type ImageGridElementProps = {
  forceSmall?: boolean
  image: DisplayableGridImage
}

export type ImageGridProps = {
  images: DisplayableGridImage[]
}

export const GenericAutoTiledGrid = forwardRef<{}, "div">(
  ({ children, ...rest }, ref) => {
    return (
      <Grid
        as="section"
        ref={ref}
        gap={2}
        gridAutoFlow="dense"
        gridAutoRows="300px"
        gridTemplateColumns={[
          "repeat(auto-fit, minmax(150px, 1fr))",
          "repeat(auto-fill, minmax(180px, 1fr))",
        ]}
        {...rest}
      >
        {children}
      </Grid>
    )
  }
)

const ImageGrid = forwardRef<ImageGridProps, "div">(
  ({ images, ...rest }, ref) => {
    return (
      <GenericAutoTiledGrid w="full">
        {images.map((image) => {
          return (
            <Box
              maxHeight="385px"
              key={image.id}
              {...(image.aspectRatio && image.aspectRatio > 1.4
                ? { gridColumn: ["auto", null, "auto / span 2"] }
                : {})}
            >
              <GenericGridElement
                src={image.thumbnail.small}
                bottom={
                  <Flex w="full" justify="space-between" p={2}>
                    {image.appearances?.[0] && (
                      <Text
                        fontSize="xs"
                        color="white"
                        zIndex="1000000"
                        opacity="var(--gradient)"
                      >
                        {image.appearances[0]?.person.name ?? "Unknown"}
                      </Text>
                    )}
                    <Text
                      as="time"
                      dateTime={image.createdAt}
                      fontSize="xs"
                      opacity="var(--gradient)"
                    >
                      {format(new Date(image.createdAt), "MMMM yyyy")}
                    </Text>
                  </Flex>
                }
                {...image}
                focus={{
                  focus: image.focus,
                  width: image.width,
                  height: image.height,
                }}
              />
            </Box>
          )
        })}
      </GenericAutoTiledGrid>
    )
  }
)

export default ImageGrid
