import { usePaginated } from "~/hooks/use-paginated"
import {
  ImagePicker,
  ImageSelector,
} from "~/components/data-entry/image-picker/image-picker"
import { Flex, Spinner } from "@chakra-ui/react"
import { useFetcher } from "remix"
import { PersonImagesLoaderContext } from "~/routes/idol/$id/__idol-context/index"

export const PersonImagePicker = (p: {
  id: number
  onSelect: ImageSelector
}) => {
  const fetcher = useFetcher<PersonImagesLoaderContext>()
  const perPage = 20
  const pagination = usePaginated(fetcher, {
    href: `/idol/${p.id}`,
    transform: (data) => data.person?.appearances ?? [],
    perPage,
    fetchOptions: (skip) => {
      return new URLSearchParams([
        ["skip", String(skip)],
        ["take", String(perPage)],
        ["id", String(p.id)],
      ])
    },
    forceFetch: true,
  })

  if (pagination.data.length === 0) {
    return (
      <Flex w="full" h="full" placeItems="center">
        <Spinner display="inline-block" />
      </Flex>
    )
  }

  return (
    <ImagePicker
      pagination={pagination}
      images={pagination.data.map((page) => page.image)}
      onSelect={p.onSelect}
    />
  )
}
