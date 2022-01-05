import { GridImageFragment } from "@/lib/__generated__/graphql"
import { DisplayableGridImage } from "@/components/data-grids/image-grid"

export const toClickableGridImage = (
  image: GridImageFragment
): DisplayableGridImage => {
  return {
    ...image,
    href: image.url,
  }
}
