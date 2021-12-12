import {
  Flex,
  forwardRef,
  Input,
  InputGroup,
  InputLeftElement,
  ModalCloseButton,
  VStack,
} from "@chakra-ui/react"
import { RiSearchLine } from "react-icons/ri"
import { Tab, TabList, TabPanels, Tabs } from "@chakra-ui/tabs"
import { PropsWithChildren } from "react"

export type QuickSearchProps = {
  placeholder?: string
  query: string
  onSearch: (query: string) => void
  closeButton: React.ReactElement
}

const QuickSearchTab = forwardRef(({ children, ...rest }, ref) => (
  <Tab
    ref={ref}
    {...rest}
    px={6}
    textTransform="uppercase"
    fontSize="12px"
    fontWeight="medium"
    letterSpacing="1.3px"
    color="hsla(228, 15%, 76%, 1)"
    _selected={{ color: "white", borderColor: "#6C8DFF" }}
  >
    {children}
  </Tab>
))

export function QuickSearchHeader({
  placeholder = "Search for anything...",
  query,
  onSearch,
  closeButton = <ModalCloseButton />,
}: QuickSearchProps) {
  return (
    <Flex w="full" overflow="hidden">
      <InputGroup w="full" outline="none">
        <InputLeftElement pointerEvents="none">
          <RiSearchLine size={22} />
        </InputLeftElement>

        <Input
          autoFocus
          placeholder={placeholder}
          autoCorrect="false"
          value={query}
          onChange={(event) => onSearch(event.target.value)}
          w="full"
          border="none"
          ml={3}
          fontWeight="medium"
          fontSize="lg"
          _focus={{
            boxShadow: "none",
          }}
          boxShadow="none"
        />
        {closeButton}
      </InputGroup>
    </Flex>
  )
}

export function QuickSearchContainer({ children }: PropsWithChildren<{}>) {
  return (
    <Flex w="full" h="800px" boxShadow="lg">
      <Flex direction="column" w="full">
        <Tabs borderColor="hsla(228, 27%, 10%, 1)" borderBottomWidth="1px">
          <TabList>
            <QuickSearchTab>All</QuickSearchTab>
            <QuickSearchTab>Tags</QuickSearchTab>
            <QuickSearchTab>People</QuickSearchTab>
            <QuickSearchTab>Groups</QuickSearchTab>
          </TabList>
          <TabPanels>
            <VStack p={4} spacing={8} overflowY="auto">
              {children}
            </VStack>
          </TabPanels>
        </Tabs>
      </Flex>
    </Flex>
  )
}
