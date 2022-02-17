import { Box, Image, Text, forwardRef, VStack } from "@chakra-ui/react"
import { GenericGridElement } from "~/components/data-grids/generic"
import React from "react"
import {
  GenericAutoTiledGrid,
  ImageGridProps,
} from "~/components/data-grids/image-grid"
import { PersonGridImageFragment } from "~/__generated__/graphql"
import { personPreferredName } from "~/client/data-mappers/person"
import { Routing } from "~/client/routing"

const IdolGrid = forwardRef<{ people: PersonGridImageFragment[] }, "div">(
  ({ people, ...rest }, ref) => {
    return (
      <GenericAutoTiledGrid w="full">
        {people.map((person) => {
          return (
            <VStack maxHeight="385px" key={person.id}>
              <GenericGridElement
                src={person.avatar?.thumbnail.medium ?? ""}
                href={Routing.toPerson(person.id, personPreferredName(person))}
              />
              <Text>{personPreferredName(person)}</Text>
            </VStack>
          )
        })}
      </GenericAutoTiledGrid>
    )
  }
)

export default IdolGrid
