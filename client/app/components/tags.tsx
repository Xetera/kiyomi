import { Box, Flex } from "@chakra-ui/react"

function Tag({ tag }: { tag: string }) {
  return (
    <a
      href={`/tag/${tag}`}
      className="bg-theme-subtle py-1 px-2 rounded text-sm font-semibold hover:text-white"
    >
      {tag}
    </a>
  )
}

export function Tags({ tags }: { tags: string[] }) {
  return (
    <Flex as="section" flexFlow="row wrap">
      {tags.map((tag) => (
        <Box key={tag} mb={1} mr={1}>
          <Tag tag={tag} />
        </Box>
      ))}
    </Flex>
  )
}
