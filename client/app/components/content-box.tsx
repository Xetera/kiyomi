import { Box, Text } from "@chakra-ui/react"
import React, { ReactNode } from "react"

export const ContentBox: React.FC<{ title?: ReactNode }> = ({
  children,
  title,
}) => {
  return (
    <Box bg="bgSecondary" p={6} w="full" color="text.80">
      {title && (
        <Text textStyle="heading-sm" pb={1} color="text.100">
          {title}
        </Text>
      )}
      {children}
    </Box>
  )
}
