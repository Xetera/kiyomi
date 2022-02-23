import { VStack } from "@chakra-ui/react"
import { LinkedTabs } from "../linked-tabs"

export const ModerationTabs = ({ children }) => {
  return (
    <VStack
      spacing={8}
      maxW="6xl"
      mx="auto"
      w="full"
      mt={6}
      px={4}
      overflow="hidden"
    >
      <LinkedTabs
        tabs={[
          {
            path: "/moderation",
            component: <h1>Reports</h1>,
          },
        ]}
      >
        {children}
      </LinkedTabs>
    </VStack>
  )
}
