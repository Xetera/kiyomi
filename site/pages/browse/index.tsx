import { BrowseImages } from "@/components/browse/images/browse-images"
import BrowseBasePage, {
  WithBrowsePageSidebar,
} from "@/components/browse/browse-base"

const Browse = () => {
  return (
    <BrowseBasePage>
      <WithBrowsePageSidebar>
        <div />
        <BrowseImages />
      </WithBrowsePageSidebar>
    </BrowseBasePage>
  )
}

export default Browse
