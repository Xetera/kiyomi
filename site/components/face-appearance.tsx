import { useImageSliceCanvas } from "@/hooks/useImageSlice"
import { FaceDataFragment, Image, Person } from "@/lib/__generated__/graphql"
import { Flex, Text } from "@chakra-ui/layout"
import { Grid, useBreakpointValue, VStack } from "@chakra-ui/react"
import React from "react"
import { EditableTag } from "@/components/data-entry/editable-tag"

export type FaceAppearance = {
  // image on the side
  appearance: {
    face?: FaceDataFragment
    person?: Pick<Person, "name">
    tags?: Array<{ tag: { name: string } }>
  }
  image: Pick<Image, "rawUrl">
}

export function FaceAppearance({ appearance, image }: FaceAppearance) {
  const { face, person } = appearance
  const height = useBreakpointValue([90, 90, 90, 120])
  const canvas = useImageSliceCanvas({
    src: image.rawUrl,
    height: height ?? 90,
    face,
    style: {
      objectFit: "cover",
    },
  })
  return (
    <VStack spacing={3} w="full" mb={-2}>
      <Grid gridAutoFlow="column" gridTemplateColumns={["50px auto"]} gap={2}>
        <Flex
          borderRadius="md"
          overflow="hidden"
          objectPosition="center"
          objectFit="cover"
          alignItems="flex-start"
          width="50px"
          height="50px"
        >
          {canvas}
        </Flex>
        <Flex height="100%" justifyContent="center" flexDirection="column">
          <Text fontSize="sm" color={person ? "gray.100" : "gray.400"}>
            {person?.name ?? <i>Unknown Person</i>}
          </Text>
        </Flex>
      </Grid>
      {appearance.tags && (
        <Flex flexFlow="row wrap">
          {appearance.tags.map(({ tag }) => (
            <EditableTag key={tag.name} mr={2} mb={2}>
              {tag.name}
            </EditableTag>
          ))}
        </Flex>
      )}
    </VStack>
  )
}
