import {
  useDiscoveryProvidersQuery,
  useDiscoveryScheduleQuery,
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
import {
  GroupSearchResult,
  SidebarSearch,
} from "@/components/discover/sidebar-search"
import { HiBadgeCheck } from "react-icons/hi"
import { useState } from "react"
import { RootState, store } from "@/models/store"
import { useSelector } from "react-redux"
import { searchGroup } from "@/client/typesense"
import { ProviderTag } from "@/components/discover/provider-tag"

function isGraphQlError(error: any): error is { message: string } {
  return error && "message" in error
}

const DiscoverySidebarSearch = () => {
  const filters = useSelector((root: RootState) => root.discovery?.searchFilter)
  const [hits, setHits] = useState<GroupSearchResult[]>([])
  return (
    <SidebarSearch
      searchType="group"
      hits={hits}
      setHits={setHits}
      runSearch={(text) => searchGroup(text).then((r) => r.hits ?? [])}
      filters={filters}
      removeFilter={store.dispatch.discovery.removeFilter}
      addFilter={store.dispatch.discovery.addFilter}
    />
  )
}

export default function DiscoverSidebar() {
  const { data, isFetching, error, isLoading } = useDiscoveryScheduleQuery()
  const providers = data?.discoverySchedule
  const groups = groupBy(providers ?? [], (e) => e.provider)
  return (
    <VStack align="flex-start" spacing={8}>
      {isLoading && <Spinner />}
      <DiscoverySidebarSearch />
      {!isLoading && isGraphQlError(error) && (
        <>
          <Text color="pink.300" fontWeight="regular">
            There was an error getting a response from the JiU server
          </Text>
          <Text as="pre" whiteSpace="break-spaces">
            {error.message}
          </Text>
        </>
      )}
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
                        <HStack spacing={1} align="center">
                          <Text textStyle="heading-sm" float="left">
                            {provider.name}
                          </Text>
                          {provider.official && (
                            <HiBadgeCheck title="Official source" />
                          )}
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
                        <ProviderTag
                          {...pr}
                          key={pr.name}
                          defaultName={pr.name}
                        />
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
