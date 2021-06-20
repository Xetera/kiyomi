import { Box } from "@chakra-ui/layout"
import { forwardRef } from "@chakra-ui/react"

const Hr = forwardRef((props, ref) => {
  return <Box as="hr" borderColor="borderSubtle" ref={ref} {...props} />
})

export default Hr
