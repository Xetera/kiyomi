import { forwardRef, Tag } from "@chakra-ui/react"

export const EditableTag = forwardRef((props, ref) => {
  return (
    <Tag
      bg="backgroundSecondary"
      {...props}
      borderColor="lightTransparent"
      borderWidth="1px"
    >
      {props.children}
    </Tag>
  )
})
