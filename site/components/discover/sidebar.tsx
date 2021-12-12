import {
  DiscoveryProvider,
  useDiscoveryProvidersQuery,
} from "@/lib/__generated__/graphql"
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Flex,
  HStack,
  Link,
  Spinner,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react"
import { decideProvider } from "@/components/discover/discovered-post"
import groupBy from "lodash/groupBy"
import { RiLink } from "react-icons/ri"
import { QuickSearchHeader } from "@/components/search/QuickSearchContainer"
import { useState } from "react"
import {
  groupsSearchToQuickSearchSection,
  QuickSearchSection,
} from "@/components/search/QuickSearchSection"
import { SearchGroup, searchGroup } from "@/client/typesense"
import { SearchResponseHit } from "typesense/lib/Typesense/Documents"

function isGraphQlError(error: any): error is { message: string } {
  return error && "message" in error
}

function SidebarSearch() {
  const [search, setSearch] = useState("")
  const [hits, setHits] = useState<Array<SearchResponseHit<SearchGroup>>>([])
  async function changeSearch(text: string) {
    setSearch(text)
    const groups = await searchGroup(text)
    setHits(groups.hits ?? [])
  }
  return (
    <VStack align="flex-start">
      <QuickSearchHeader
        placeholder="Search social media posts"
        query={search}
        onSearch={changeSearch}
        closeButton={<div />}
      />
      <QuickSearchSection
        type="group"
        data={groupsSearchToQuickSearchSection(hits)}
      />
    </VStack>
  )
}

export default function DiscoverSidebar() {
  const { data, isFetching, error, isLoading } = useDiscoveryProvidersQuery()
  const providers = data?.discoveryProviders
  const groups = groupBy(providers ?? [], (e) => e.provider)
  return (
    <VStack align="flex-start" spacing={8}>
      {isLoading && <Spinner />}
      {isGraphQlError(error) && (
        <>
          <Text color="pink.300" fontWeight="regular">
            There was an error getting a response from the JiU server
          </Text>
          <Text as="pre" whiteSpace="break-spaces">
            {error.message}
          </Text>
        </>
      )}
      <SidebarSearch />
      {providers && (
        <>
          <VStack align="flex-start" spacing={3}>
            <Text textStyle="heading">Upcoming Checks</Text>
            {[...(providers ?? [])]
              .sort((a, b) => a.waitDays - b.waitDays)
              .slice(0, 10)
              .map((provider) => {
                const { component } = decideProvider(provider.provider)
                return (
                  <HStack spacing={3} align="center">
                    <Flex h="8" w="8" justify="center" align="center">
                      {component}
                    </Flex>
                    <VStack align="flex-start" spacing={1}>
                      <Link
                        href={provider.url}
                        rel="noopener external"
                        target="_blank"
                      >
                        <HStack align="flex-start" spacing={1}>
                          <Text textStyle="heading-sm" float="left">
                            {provider.name}
                          </Text>
                          <RiLink size={12} color="gray" />
                        </HStack>
                      </Link>
                      <Text textStyle="text-sm" color="text.500">
                        {provider.waitDays > 0
                          ? `in ${provider.waitDays} days`
                          : "Today"}
                      </Text>
                    </VStack>
                  </HStack>
                )
              })}
          </VStack>
          <VStack align="flex-start" spacing={3} w="full">
            <Text textStyle="heading">All Sources</Text>
            <Accordion w="full" allowToggle allowMultiple>
              {Object.entries(groups).map(([name, providers]) => {
                const { component, label } = decideProvider(name)
                return (
                  <AccordionItem borderColor="rgba(60, 60, 60, 0.4)">
                    <AccordionButton>
                      <Flex justify="space-between" w="full">
                        <HStack spacing={3}>
                          <Flex h="6" w="6">
                            {component}
                          </Flex>
                          <Text>{label}</Text>
                        </HStack>
                        <Tag lineHeight="1">{providers.length}</Tag>
                      </Flex>
                    </AccordionButton>
                    <AccordionPanel mb={-2}>
                      {providers.map((pr) => (
                        <Tag mr={2} mb={2} key={pr.name}>
                          {pr.name}
                        </Tag>
                      ))}
                    </AccordionPanel>
                  </AccordionItem>
                )
              })}
            </Accordion>
          </VStack>
        </>
      )}
    </VStack>
  )
}
