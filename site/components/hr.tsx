import { Box } from "@chakra-ui/layout"
import { forwardRef } from "@chakra-ui/react"

const Hr = forwardRef((props, ref) => {
  const { className, ...rest } = props
  return <Box as="hr" borderColor="borderSubtle" ref={ref} {...rest} />
})

export default Hr
