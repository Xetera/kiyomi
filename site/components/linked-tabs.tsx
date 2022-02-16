import { forwardRef, HStack, Link, VStack } from "@chakra-ui/react"
import { PropsWithChildren } from "react"
import NextLink from "next/link"
import { useRouter } from "next/router"

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
      <Link
        _hover={{ textDecoration: "none" }}
        py={2}
        fontWeight="medium"
        px={3}
        ref={ref}
        {...rest}
      >
        {children}
      </Link>
    )
  }
)

export const LinkedTabs = (props: PropsWithChildren<LinkedTabsProps>) => {
  const router = useRouter()
  return (
    <VStack spacing={8} w="full">
      <HStack spacing={props.spacing ?? 0} overflow="hidden">
        {props.tabs.map((tab) => {
          const trimmedPath = tab.path.replace(
            process.env.NEXT_PUBLIC_BASE_URL!,
            ""
          )
          return (
            <NextLink href={tab.path} passHref key={trimmedPath}>
              {tab.component({ selected: router.asPath === trimmedPath })}
            </NextLink>
          )
        })}
      </HStack>
      {props.children}
    </VStack>
  )
}
