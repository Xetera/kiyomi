import { WithNavbar } from "@/components/navbar"
import { LinkedTabs } from "@/components/linked-tabs"
import { forwardRef, VStack } from "@chakra-ui/react"
import { SidebarGrid } from "@/components/discover/tabs"

const BrowseBasePage = ({ children }) => {
  return (
    <WithNavbar>
      <VStack mx="auto" maxW="7xl" w="full" pt={16}>
        <LinkedTabs
          tabs={[
            { path: "/browse", component: <h1>Images</h1> },
            { path: "/browse/idols", component: <h1>Idols</h1> },
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
