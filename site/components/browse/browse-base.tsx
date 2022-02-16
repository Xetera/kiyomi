import { WithNavbar } from "@/components/navbar"
import {
  LinkedTabs,
  LinkedTabWrapper,
  makeLinkedTabWrapper,
} from "@/components/linked-tabs"
import { forwardRef, VStack } from "@chakra-ui/react"
import { SidebarGrid } from "@/components/discover/tabs"

const BrowseBasePage = ({ children }) => {
  return (
    <WithNavbar>
      <VStack mx="auto" maxW="6xl" w="full" pt={16}>
        <LinkedTabs
          tabs={[
            { path: "/browse", component: makeLinkedTabWrapper("Images") },
            { path: "/browse/idols", component: makeLinkedTabWrapper("Idols") },
          ]}
        >
          {children}
        </LinkedTabs>
      </VStack>
    </WithNavbar>
  )
}

export const WithBrowsePageSidebar = forwardRef(
  ({ children, ...rest }, ref) => {
    return (
      <SidebarGrid
        templateColumns={["1fr", null, null, "1fr 3fr"]}
        w="full"
        ref={ref}
        {...rest}
      >
        {children}
      </SidebarGrid>
    )
  }
)

export default BrowseBasePage
