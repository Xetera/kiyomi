import { Outlet } from "remix"
import BrowseBasePage, {
  WithBrowsePageSidebar,
} from "~/components/browse/browse-base"

const BrowseContext = () => {
  return (
    <BrowseBasePage>
      <WithBrowsePageSidebar>
        <Outlet />
      </WithBrowsePageSidebar>
    </BrowseBasePage>
  )
}

export default BrowseContext
