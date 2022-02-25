import { Box, forwardRef, Grid, VStack } from "@chakra-ui/react"
import { PropsWithChildren } from "react"

export type EditModalProps = {
  sidebar?: React.ReactNode
}

export const EditModal = forwardRef<PropsWithChildren<EditModalProps>, "div">(
  (p, ref) => {
    const { sidebar, children, ...rest } = p
    return (
      <Grid
        gridTemplateColumns={
          sidebar ? ["1fr", null, null, "300px auto"] : "1fr"
        }
        maxW="100%"
        w="full"
        h="full"
        overflow="hidden"
        borderRadius="md"
        flex="1"
        minH="85vh"
        {...rest}
        ref={ref}
      >
        {sidebar && <Box>{sidebar}</Box>}
        <VStack bg="#0d0f16" overflow="hidden" w="full">
          {children}
        </VStack>
      </Grid>
    )
  }
)
