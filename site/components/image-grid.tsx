import { Box, forwardRef, Grid } from "@chakra-ui/react"
import React from "react"
import { ImageGridElement, ImageGridElementProps } from "./image-grid-element"

export type ImageGridProps = {
  images: Array<ImageGridElementProps["image"] & { aspectRatio: number }>
}

const ImageGrid = forwardRef<ImageGridProps, "div">(
  ({ images, ...rest }, ref) => {
    return (
      <Grid
        ref={ref}
        gap={2}
        gridAutoFlow="dense"
        gridAutoRows="300px"
        gridTemplateColumns={[
          "repeat(auto-fit, minmax(150px, 1fr))",
          "repeat(auto-fill, minmax(220px, 1fr))",
        ]}
        {...rest}
      >
        {images.map((image) => (
          <Box
            maxHeight="385px"
            key={image.id}
            {...(image.aspectRatio > 1.4
              ? { gridColumn: "auto / span 2" }
              : {})}
          >
            <ImageGridElement image={image} />
          </Box>
        ))}
      </Grid>
    )
  }
)

export default ImageGrid
