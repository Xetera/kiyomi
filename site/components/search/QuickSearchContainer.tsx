import {
  Flex,
  forwardRef,
  Input,
  InputGroup,
  InputLeftElement,
  VStack,
} from "@chakra-ui/react"
import { RiSearchLine } from "react-icons/ri"
import { Tab, TabList, TabPanels, Tabs } from "@chakra-ui/tabs"
import { QuickSearchSection } from "@/components/search/QuickSearchSection"
import { PropsWithChildren } from "react"

export type QuickSearchProps = {
  placeholder?: string
  query: string
  onSearch: (query: string) => void
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

export function QuickSearchContainer({
  placeholder = "Search for anything...",
  onSearch,
  query,
  children,
}: PropsWithChildren<QuickSearchProps>) {
  return (
    <Flex
      w="full"
      h="800px"
      bg="hsla(231, 28%, 7%, 1)"
      overflow="hidden"
      borderRadius="md"
      boxShadow="lg"
    >
      <Flex
        direction="column"
        bg="linear-gradient(to bottom, hsla(0, 0%, 0%, 0), hsla(227, 25%, 5%, 1.0))"
        w="full"
      >
        <Flex m={2}>
          <InputGroup w="full" outline="none">
            <InputLeftElement pointerEvents="none">
              <RiSearchLine size={22} />
            </InputLeftElement>

            <Input
              autoFocus
              placeholder={placeholder}
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
          </InputGroup>
        </Flex>
        <Tabs borderColor="hsla(228, 27%, 10%, 1)" borderBottomWidth="1px">
          <TabList>
            <QuickSearchTab>All</QuickSearchTab>
            <QuickSearchTab>Tags</QuickSearchTab>
            <QuickSearchTab>People</QuickSearchTab>
            <QuickSearchTab>Groups</QuickSearchTab>
          </TabList>
          <TabPanels overflow="auto">
            <VStack p={4} spacing={8}>
              {children}
            </VStack>
          </TabPanels>
        </Tabs>
      </Flex>
    </Flex>
  )
}
