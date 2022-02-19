import {
  Flex,
  forwardRef,
  HStack,
  Link as ChakraLink,
  VStack,
} from "@chakra-ui/react"
import { PropsWithChildren } from "react"
import { Link, NavLink, useMatches } from "remix"

export type TabGenerator = (opts: { selected: boolean }) => React.ReactNode

export type Tab = {
  path: string
  component: TabGenerator
}

export type LinkedTabsProps = {
  spacing?: number
  tabs: Tab[]
}

export const makeLinkedTabWrapper = (name: string): TabGenerator => {
  return (opts) => {
    return (
      <LinkedTabWrapper color={opts.selected ? "text.100" : "text.40"}>
        {name}
      </LinkedTabWrapper>
    )
  }
}

export const LinkedTabWrapper = forwardRef<PropsWithChildren<any>, "a">(
  ({ children, ...rest }, ref) => {
    return (
      <Flex
        _hover={{ textDecoration: "none" }}
        py={2}
        fontWeight="medium"
        px={3}
        ref={ref}
        {...rest}
      >
        {children}
      </Flex>
    )
  }
)

export const LinkedTabs = (props: PropsWithChildren<LinkedTabsProps>) => {
  return (
    <VStack spacing={8} w="full">
      <HStack spacing={props.spacing ?? 0} overflow="hidden">
        {props.tabs.map((tab, i) => {
          return (
            <ChakraLink
              as={NavLink}
              to={tab.path}
              key={tab.path}
              end
              prefetch="intent"
              lineHeight={1.1}
              _hover={{ textDecoration: "none" }}
            >
              {({ isActive }: { isActive: boolean }) =>
                tab.component({ selected: isActive })
              }
            </ChakraLink>
          )
        })}
      </HStack>
      {props.children}
    </VStack>
  )
}
