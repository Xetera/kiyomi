import { Heading, Stack } from "@chakra-ui/layout"
import { Box, Flex, forwardRef, VStack } from "@chakra-ui/react"
import React, { PropsWithChildren } from "react"

export type ContextSidebarProps = {
  items: React.ReactNode[]
}

export const ContextSidebar: React.FC<ContextSidebarProps> = forwardRef(
  ({ items, ...rest }, ref) => {
    return (
      <Stack
        height="100%"
        spacing={[2, 2, 4]}
        {...rest}
        ref={ref}
        direction="column"
      >
        {items}
      </Stack>
    )
  }
)

export type SidebarItemProps = {
  title: React.ReactChild | string
}

export const sidebarItemPadding = {
  py: [2, 3],
  px: [3, 4, 5],
}

export const SidebarItem = forwardRef<SidebarItemProps, "div">((opts, ref) => {
  const { title, ...rest } = opts
  return (
    <Flex flexDirection="column" ref={ref} {...rest}>
      <Flex background="bgPrimary" {...sidebarItemPadding}>
        <Heading size="sm" fontWeight="500">
          {opts.title}
        </Heading>
      </Flex>
      <VStack py={[2, 3]} px={[3, 4, 5]} spacing={8}>
        {opts.children}
      </VStack>
    </Flex>
  )
})

export type WithSidebarProps = {
  sidebar: React.ReactNode
  sidebarWidth?: string[]
}

export function WithSidebar({
  sidebar,
  sidebarWidth = ["0", "170px", "250px", "350px"],
  children,
}: PropsWithChildren<WithSidebarProps>) {
  return (
    <Flex flex={1}>
      {sidebar && (
        <Flex
          display={["none", "block"]}
          minWidth={sidebarWidth}
          background="bgPrimary"
        >
          {sidebar}
        </Flex>
      )}
      <Box display={["none", "block"]} width="1px" background="borderSubtle" />
      {children}
    </Flex>
  )
}
