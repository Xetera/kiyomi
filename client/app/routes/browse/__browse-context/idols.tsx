import { BrowseIdols } from "~/components/browse/idols/browse-idols"
import BrowseBasePage from "~/components/browse/browse-base"
import { LoaderFunction } from "remix"
import { sdk } from "~/client/graphql"
import { pagination } from "~/client/pagination"
import {
  BrowsePageIdolsQuery,
  BrowsePageIdolsWithFilterQuery,
} from "~/__generated__/graphql"

export type IdolBrowseLoaderContext =
  | BrowsePageIdolsWithFilterQuery
  | BrowsePageIdolsQuery

export const loader: LoaderFunction = ({
  request,
}): Promise<IdolBrowseLoaderContext> => {
  const { take, skip, params } = pagination(request)
  const qs = new URL(request.url).searchParams
  const groupIds = params.get("groupIds")?.split(",").map(Number)
  if (groupIds && groupIds.length === 0) {
    return sdk.BrowsePageIdolsWithFilter({ take, skip, groups: groupIds })
  } else {
    return sdk.BrowsePageIdols({ take, skip })
  }
}

const BrowseIdolsPage = () => {
  return <BrowseIdols />
}

export default BrowseIdolsPage
