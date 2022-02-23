import { Box, Button, forwardRef, HStack, Kbd, VStack } from "@chakra-ui/react"
import React from "react"
import { GameServerContext } from "@/models/contexts"
import { useSelector } from "~/hooks/useSelector"
import { store } from "@/models/store"
import { Flex, Grid, Text } from "@chakra-ui/layout"
import { Search } from "~/components/searchbar"
import { Portrait } from "~/components/portrait"
import { useHotkeys } from "react-hotkeys-hook"

const SearchResults = forwardRef((props, ref) => {
  const { send } = React.useContext(GameServerContext)
  const results = useSelector((r) => r.game.personHintResults)

  function submit(id: number) {
    props.setSearch("")
    send({ t: "answer", id })
  }

  return (
    <Grid
      {...props}
      ref={ref}
      w="full"
      alignItems="flex-start"
      gap={4}
      bg="bgPrimary"
      gridAutoFlow="row"
    >
      {results.map(({ document: result }) => {
        const preferredName = result.preferredAlias ?? result.name // result.preferredGroupName
        return (
          <Button
            key={result.id}
            bg="transparent"
            borderColor="borderSubtle"
            borderWidth="1px"
            px={2}
            py={2}
            w="full"
            h="full"
            appearance="none"
            alignItems="center"
            justifyContent="flex-start"
            tabIndex={0}
            onClick={() => {
              submit(result.personId)
            }}
          >
            <HStack h="full">
              <Portrait
                display={{ base: "none", md: "inherit" }}
                src={result.thumbnailSmall}
                opacity={1}
                width={["40px", null, "80px"]}
                height={["80px", null, "120px"]}
              />
              <VStack
                flexFlow="column"
                alignItems="flex-start"
                h="full"
                p={1}
                spacing={1}
              >
                <Text
                  fontStyle="heading-sm"
                  fontSize={["14px", null, "18px", "20px"]}
                >
                  {preferredName}
                </Text>
                {result.preferredGroupName && (
                  <Text
                    fontWeight="medium"
                    fontSize={{ base: "12px", lg: "14px" }}
                    color="gray.400"
                  >
                    {result.preferredGroupName}
                  </Text>
                )}
              </VStack>
            </HStack>
          </Button>
        )
      })}
    </Grid>
  )
})

export const GameSearch = forwardRef((props, ref) => {
  const { send } = React.useContext(GameServerContext)
  const searching = useSelector((r) => r.game.personHintSearching)
  const hints = useSelector((r) => r.game.room?.hints)
  const hintedGroupName = useSelector((r) => r.game?.hintedGroupName)

  useHotkeys(
    "ctrl+space",
    (e) => {
      console.log("bro pls workv", e)
      if (hints) {
        send({ t: "hint" })
      }
    },
    { enableOnTags: ["INPUT"] }
  )
  const [search, setSearch] = React.useState("")

  function onEnter() {
    // we don't need reactivity so this is a faster way of doing things
    const [firstPerson] = store.getState().game.personHintResults
    if (!firstPerson) {
      console.warn("No person hints to choose from")
      return
    }
    send({ t: "answer", id: Number(firstPerson.document.id) })
  }

  function onSearch(q: string) {
    store.dispatch.game.searchIdol(q)
  }

  return (
    <Flex
      {...props}
      ref={ref}
      zIndex="4"
      flexFlow="column"
      w="full"
      position={["fixed", null, "static"]}
      left={0}
      right={0}
      bottom={0}
    >
      <Search
        bg="bgPrimary"
        search={search}
        autoFocus
        setSearchString={setSearch}
        searching={searching}
        onSearch={onSearch}
        onEnter={onEnter}
        debounceTime={150}
        placeholder="Who's the highlighted person?"
        hasClearButton={false}
      />
      <Text
        color="gray.500"
        fontSize="xs"
        mt={3}
        display={{ base: "none", lg: "block" }}
      >
        {hints !== "disabled" &&
          (hintedGroupName ? (
            <Text alignItems="center" textStyle="text">
              This person is in{" "}
              <Box as="span" color="yellow.300">
                {" "}
                {hintedGroupName}
              </Box>
            </Text>
          ) : (
            <>
              <Kbd>Ctrl</Kbd> + <Kbd>Space</Kbd> to request a hint
            </>
          ))}
      </Text>
      <Flex position={{ base: "static", md: "relative" }} w="full" mt={3}>
        <SearchResults
          setSearch={setSearch}
          zIndex="4"
          position="absolute"
          left={0}
          right={0}
          top={{ base: "unset", lg: "100%" }}
          bottom={{ base: "unset", lg: "unset" }}
          gridAutoFlow="row-reverse"
        />
      </Flex>
    </Flex>
  )
})
