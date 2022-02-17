import { usePaginated } from "~/hooks/use-paginated"
import {
  PersonImagesDocument,
  PersonImagesQuery,
  PersonImagesQueryVariables,
} from "~/__generated__/graphql"
import {
  ImagePicker,
  ImageSelector,
} from "~/components/data-entry/image-picker/image-picker"
import { Spinner } from "@chakra-ui/react"

export const PersonImagePicker = (p: {
  id: number
  onSelect: ImageSelector
}) => {
  const { data, waypoint } = usePaginated<
    PersonImagesQuery,
    PersonImagesQueryVariables
  >({
    perPage: 30,
    document: PersonImagesDocument,
    queryKey: ["PersonImages", { id: p.id }],
    variables() {
      return { id: p.id }
    },
  })

  if (!data?.pages) {
    return <Spinner />
  }

  return (
    <ImagePicker
      waypoint={waypoint}
      images={data.pages.flatMap((page) => page.images)}
      onSelect={p.onSelect}
    />
  )
}
