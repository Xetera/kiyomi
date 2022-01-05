import { EditModal } from "@/components/data-entry/edit-modal"
import ImageGrid, {
  DisplayableGridImage,
} from "@/components/data-grids/image-grid"
import { ModalCloseButton } from "@chakra-ui/react"

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
  props: ImagePickerProps & { waypoint: React.ReactNode }
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
      <ImagePickerContainer {...props} />
      {props.waypoint}
    </EditModal>
  )
}
