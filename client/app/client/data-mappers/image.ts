import type { GridImageFragment, Maybe } from "~/__generated__/graphql"
import { DisplayableGridImage } from "~/components/data-grids/image-grid"
import { Routing } from "../routing"
// import type { DisplayableGridImage } from "~/components/data-grids/image-grid"

export const toClickableGridImage = (
  image: GridImageFragment
): DisplayableGridImage => {
  return {
    ...image,
    href: Routing.toImage(image.slug),
  }
}
