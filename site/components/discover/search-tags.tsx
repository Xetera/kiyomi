import { forwardRef, Tag, TagCloseButton, TagLabel } from "@chakra-ui/react"
import { Flex } from "@chakra-ui/layout"

export type SearchTagsProps = {
  tags: SearchTag[]
  onRemove: (tag: SearchTag) => void
}

export type SearchTag = { type: "group" | "person"; name: string; id: number }

export const SearchTags = forwardRef<SearchTagsProps, "div">((props, ref) => {
  const { onRemove, tags, ...rest } = props
  return (
    <Flex flexWrap="wrap" ref={ref} {...rest} mt={4}>
      {tags.map((tag) => (
        <Tag mr={2} mb={2}>
          <TagLabel>{tag.name}</TagLabel>
          <TagCloseButton onClick={() => onRemove(tag)} />
        </Tag>
      ))}
    </Flex>
  )
})
