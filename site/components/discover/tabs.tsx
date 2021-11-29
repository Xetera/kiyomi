import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs"

type DiscoverTabsOptions = {
  discover: React.ReactElement
}

export default function DiscoverTabs(props: DiscoverTabsOptions) {
  return (
    <Tabs w="full" zIndex={2} colorScheme="white">
      <TabList borderColor="rgba(60, 60, 60, 0.4)" borderBottomWidth="1px">
        <Tab borderBottomWidth="1px">Feed</Tab>
        <Tab borderBottomWidth="1px">Verification Rules</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>{props.discover}</TabPanel>
      </TabPanels>
    </Tabs>
  )
}
