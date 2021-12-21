import { forwardRef, Tag } from "@chakra-ui/react"
import React from "react"

export type UserAttributeProps = {
  name: string
}

export const UserAttribute = forwardRef<UserAttributeProps, "div">(
  ({ name, ...rest }, ref) => {
    return (
      <Tag mr={2} fontSize="sm" ref={ref} {...rest}>
        {name}
      </Tag>
    )
  }
)
