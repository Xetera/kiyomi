import React, { PropsWithChildren } from "react"
import { Flex } from "@chakra-ui/react"
import { Waypoint } from "react-waypoint"

export const Paginatable = (
  props: PropsWithChildren<{ loadMore: () => void }>
) => {
  return (
    <Flex flexDir="column">
      {props.children}
      <Waypoint onEnter={props.loadMore} topOffset="-1500px" />
    </Flex>
  )
}
