import { PersonPage } from "~/components/person/page"
import { decodeUriFriendly } from "~/client/data-mappers/encoding"
import { LoaderFunction } from "remix"
import { sdk } from "~/client/graphql"
import { pagination } from "~/client/pagination"
import { OnePersonImagesQuery } from "~/__generated__/graphql"

export type PersonImagesLoaderContext = OnePersonImagesQuery

export const loader: LoaderFunction = async ({
  request,
  params,
}): Promise<PersonImagesLoaderContext> => {
  if (!params.id) {
    throw Error("$id was not given")
  }
  return sdk.OnePersonImages({
    ...pagination(request),
    id: decodeUriFriendly(params.id),
  })
}

const PersonPageIndex = () => {
  return <PersonPage />
}

export default PersonPageIndex
