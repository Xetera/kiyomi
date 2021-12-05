import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs"
import { Flex, Grid, Spinner, Tag } from "@chakra-ui/react"
import React from "react"
import {
  useDiscoveryProvidersQuery,
  useDiscoveryStatsQuery,
} from "@/lib/__generated__/graphql"
import DiscoverSidebar from "@/components/discover/sidebar"

type DiscoverTabsOptions = {
  queue: React.ReactElement
}

export default function DiscoverTabs(props: DiscoverTabsOptions) {
  const { data } = useDiscoveryStatsQuery()
  const totalVerdicts = data
    ? data.discoveryStats.reduce((total, stat) => stat.count, 0)
    : undefined
  return (
    <Tabs w="full" zIndex={2} colorScheme="white">
      <TabList borderColor="rgba(60, 60, 60, 0.4)" borderBottomWidth="1px">
        <Tab borderBottomWidth="1px">Feed</Tab>
        <Tab borderBottomWidth="1px">Verification Rules</Tab>
        <Tab borderBottomWidth="1px">
          <Flex align="center">
            My Verifications
            <Tag marginInlineStart={2}>
              {totalVerdicts === undefined ? (
                <Spinner size="xs" />
              ) : (
                totalVerdicts
              )}
            </Tag>
          </Flex>
        </Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <Grid
            as="main"
            templateColumns={["1fr", null, null, "1fr 2fr"]}
            templateRows={"auto"}
            autoFlow={["row", null, null, "column"]}
            gap={6}
          >
            <DiscoverSidebar />
            <Grid zIndex={10} gap={4} autoFlow="row">
              {props.queue}
            </Grid>
          </Grid>
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}
