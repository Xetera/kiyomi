import { Box, Grid, Text } from "@chakra-ui/layout"
import { Flex } from "@chakra-ui/react"
import { AnimatePresence, motion } from "framer-motion"
import React, { HTMLAttributes } from "react"

function decimalToHex(num: number) {
  return `#${num.toString(16)}`
}

const MotionText = motion(Text)

export function PaletteColor({ color }: { color: number }) {
  const colorHex = color.toString(16)
  const [hovering, setHovering] = React.useState(false)
  return (
    <Flex
      width="100%"
      height="24px"
      flexDirection="row"
      alignItems="center"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      position="relative"
      background={decimalToHex(color)}
    >
      <AnimatePresence>
        {hovering && (
          <MotionText
            transition={{ duration: 0.4 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            position="absolute"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            fontWeight="600"
            fontSize="xs"
            width="100%"
          >
            #{colorHex}
          </MotionText>
        )}
      </AnimatePresence>
    </Flex>
  )
}

export function Palette({
  colors,
  ...rest
}: HTMLAttributes<HTMLDivElement> & { colors: number[] }) {
  return (
    <Grid
      gridAutoFlow="column"
      mt={2}
      as="section"
      {...rest}
      border="1px solid"
      borderColor="borderSubtle"
      borderRadius="sm"
      overflow="hidden"
    >
      {colors.slice(0, 5).map((color) => (
        <PaletteColor color={color} key={color} />
      ))}
    </Grid>
  )
}
