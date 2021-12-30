import { forwardRef, Tag, TagCloseButton } from "@chakra-ui/react"

export type EditableTagProps = {
  onClose?(): void
}

export const EditableTag = forwardRef<EditableTagProps, "div">((props, ref) => {
  return (
    <Tag
      bg="backgroundSecondary"
      {...props}
      borderColor="lightTransparent"
      borderWidth="1px"
    >
      {props.children}
      {props.onClose && <TagCloseButton onClick={props.onClose} />}
    </Tag>
  )
})
