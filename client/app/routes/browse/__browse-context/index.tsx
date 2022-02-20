import { LoaderFunction } from "remix"
import { sdk } from "~/client/graphql"
import { pagination } from "~/client/pagination"
import { BrowseImages } from "~/components/browse/images/browse-images"
import { BrowsePageQuery } from "~/__generated__/graphql"

export type ImageBrowseLoaderContext = BrowsePageQuery

export const loader: LoaderFunction = ({
  request,
}): Promise<ImageBrowseLoaderContext> => {
  return sdk.BrowsePage(pagination(request))
}

const Browse = () => {
  return (
    <>
      <div />
      <BrowseImages />
    </>
  )
}

export default Browse
