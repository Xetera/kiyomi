import { Link, Flex, HStack, VStack } from "@chakra-ui/react"
import { PropsWithChildren } from "react"
import NextLink from "next/link"
import { useRouter } from "next/router"

type Tab = {
  path: string
  component: React.ReactNode
}

export type LinkedTabsProps = {
  tabs: Tab[]
}
export const LinkedTabs = (props: PropsWithChildren<LinkedTabsProps>) => {
  const router = useRouter()
  return (
    <VStack spacing={8} w="full">
      <HStack>
        {props.tabs.map((tab) => {
          console.log(router.asPath, tab.path)
          const trimmedPath = tab.path.replace(
            process.env.NEXT_PUBLIC_BASE_URL!,
            ""
          )
          return (
            <NextLink href={tab.path} passHref>
              <Link
                _hover={{ textDecoration: "none" }}
                py={2}
                fontWeight="medium"
                px={3}
                key={tab.path}
                borderBottomWidth={router.asPath === trimmedPath ? "2px" : "0"}
              >
                {tab.component}
              </Link>
            </NextLink>
          )
        })}
      </HStack>
      {props.children}
    </VStack>
  )
}
