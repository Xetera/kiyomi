import type { GridImageFragment, Maybe } from "~/__generated__/graphql"
import { DisplayableGridImage } from "~/components/data-grids/image-grid"
// import type { DisplayableGridImage } from "~/components/data-grids/image-grid"

export const toClickableGridImage = (
  image: GridImageFragment
): DisplayableGridImage => {
  return {
    ...image,
    href: image.url,
  }
}

// export const imageVisibleFor = <
//   T extends { hiddenAt?: Maybe<Date>; public?: boolean }
// >(
//   image?: T | null,
//   requester?: { roles: BaseRoles }
// ): T | undefined => {
//   const out = image ?? undefined
//   if (requester && hasRole(requester.roles, Role.Moderator)) {
//     return out
//   }
//   if (image?.hiddenAt) {
//     return
//   }
//   return out
// }
