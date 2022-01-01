import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs"
import { Flex, forwardRef, Grid, Spinner, Tag } from "@chakra-ui/react"
import React, { PropsWithChildren } from "react"
import { useDiscoveryStatsQuery } from "@/lib/__generated__/graphql"
import DiscoverSidebar from "@/components/discover/sidebar"
import { DiscoveryHistorySidebar } from "@/components/discover/discovery-history-sidebar"
import { AddProvider } from "@/components/discover/add-provider"

export const SidebarGrid = forwardRef<PropsWithChildren<any>, "main">(
  (props, ref) => (
    <Grid
      as="main"
      templateColumns={["1fr", null, null, "1fr 2fr"]}
      templateRows={"auto"}
      autoFlow={["row", null, null, "column"]}
      gap={6}
      {...props}
      ref={ref}
    >
      {props.children}
    </Grid>
  )
)

type DiscoverTabsOptions = {
  queue: React.ReactElement
  history: React.ReactElement
}

export default function DiscoverTabs(props: DiscoverTabsOptions) {
  const { data } = useDiscoveryStatsQuery()
  const totalVerdicts = data
    ? data.discoveryStats.reduce((total, stat) => stat.count + total, 0)
    : undefined
  return (
    <Tabs w="full" zIndex={2} colorScheme="white">
      <TabList
        borderColor="rgba(60, 60, 60, 0.4)"
        borderBottomWidth="1px"
        overflowX="auto"
        overflowY="hidden"
        whiteSpace="nowrap"
      >
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
        <Tab>Social Media</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <SidebarGrid>
            <DiscoverSidebar />
            <Grid zIndex={10} gap={4} autoFlow="row">
              {props.queue}
            </Grid>
          </SidebarGrid>
        </TabPanel>
        <TabPanel />
        <TabPanel>
          <SidebarGrid>
            <DiscoveryHistorySidebar />
            <Grid zIndex={10} gap={4} autoFlow="row">
              {props.history}
            </Grid>
          </SidebarGrid>
        </TabPanel>
        <TabPanel>
          <AddProvider />
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}
