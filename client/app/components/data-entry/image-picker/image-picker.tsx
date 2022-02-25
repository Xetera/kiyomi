import { EditModal } from "~/components/data-entry/edit-modal"
// @ts-ignore
import { InfiniteScroll } from "react-simple-infinite-scroll"
import ImageGrid, {
  DisplayableGridImage,
} from "~/components/data-grids/image-grid"
import { Box, ModalCloseButton } from "@chakra-ui/react"
import { usePaginated } from "~/hooks/use-paginated"

type SelectableImage = Omit<DisplayableGridImage, "href" | "onClick">

export type ImageSelector = (image: SelectableImage) => void

export type ImagePickerProps = {
  images: Array<SelectableImage>
  hasMore?: boolean
  onSelect: ImageSelector
}

const ImagePickerContainer = ({ onSelect, images }: ImagePickerProps) => {
  return (
    <ImageGrid
      images={images.map((img) => ({
        ...img,
        onClick() {
          onSelect(img)
        },
      }))}
    />
  )
}

export const ImagePicker = (
  props: ImagePickerProps & { pagination: usePaginated }
) => {
  return (
    <EditModal p={4} w="full">
      <ModalCloseButton
        right={8}
        top={8}
        position="fixed"
        zIndex={8}
        bg="rgba(0, 0, 0, 0.5)"
      />

      <Box w="full">
        <InfiniteScroll
          throttle={100}
          threshold={300}
          isLoading={props.pagination.fetcher.state === "loading"}
          hasMore={true}
          onLoadMore={props.pagination.loadMore}
        >
          <ImagePickerContainer {...props} />
        </InfiniteScroll>
      </Box>
    </EditModal>
  )
}
