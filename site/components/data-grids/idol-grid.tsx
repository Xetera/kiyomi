import { Box, Image, Text, forwardRef, VStack } from "@chakra-ui/react"
import { GenericGridElement } from "@/components/data-grids/generic-grid-element"
import React from "react"
import {
  GenericAutoTiledGrid,
  ImageGridProps,
} from "@/components/data-grids/image-grid"
import { PersonGridImageFragment } from "@/lib/__generated__/graphql"
import { personPreferredName } from "@/client/data"

const IdolGrid = forwardRef<{ people: PersonGridImageFragment[] }, "div">(
  ({ people, ...rest }, ref) => {
    return (
      <GenericAutoTiledGrid w="full">
        {people.map((person) => (
          <VStack maxHeight="385px" key={person.id}>
            <GenericGridElement src={person.name} href="#" />
            <Text>{personPreferredName(person)}</Text>
          </VStack>
        ))}
      </GenericAutoTiledGrid>
    )
  }
)

export default IdolGrid
