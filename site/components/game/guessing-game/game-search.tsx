import { Button, forwardRef, Image, Kbd } from "@chakra-ui/react"
import React from "react"
import { GameServerContext } from "@/models/contexts"
import { useSelector } from "@/hooks/useSelector"
import { store } from "@/models/store"
import { Flex, Grid, Heading, Text } from "@chakra-ui/layout"
import { Search } from "@/components/searchbar"

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
      gridAutoFlow="row"
    >
      {results.map(({ document: result }) => (
        <Button
          key={result.id}
          bg="transparent"
          borderColor="borderSubtle"
          borderWidth="1px"
          px={4}
          py={2}
          w="full"
          h="full"
          appearance="none"
          alignItems="center"
          justifyContent="flex-start"
          tabIndex={0}
          onClick={() => {
            console.log("sending result", result)
            submit(result.personId)
          }}
        >
          <Image
            src="https://placewaifu.com/image/30/30"
            width="35px"
            height="35px"
            borderRadius="md"
            mr={2}
          />
          <Flex flexFlow="column" alignItems="flex-start">
            <Heading fontSize="md">{result.name}</Heading>
            <Flex flexFlow="row wrap" as="span" lineHeight="1.4">
              {result.aliases.map((e) => (
                <Text fontSize="sm" color="gray.500" mr={2}>
                  {e}
                </Text>
              ))}
            </Flex>
          </Flex>
        </Button>
      ))}
    </Grid>
  )
})

export const GameSearch = forwardRef((props, ref) => {
  const { send } = React.useContext(GameServerContext)
  const searching = useSelector((r) => r.game.personHintSearching)
  const hints = useSelector((r) => r.game.room?.hints)

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
      position={["fixed", null, "static"]}
      left={0}
      right={0}
      bottom={0}
    >
      <Search
        search={search}
        setSearchString={setSearch}
        searching={searching}
        onSearch={onSearch}
        onEnter={onEnter}
        debounceTime={150}
        placeholder="Who's the highlighted person?"
        mb={[0, null, null, 3]}
        hasClearButton={false}
      />
      <Text color="gray.500" fontSize="xs">
        {hints !== "disabled" && (
          <>
            <Kbd>Ctrl</Kbd> + <Kbd>Space</Kbd> to request a hint
          </>
        )}
      </Text>
      <SearchResults
        setSearch={setSearch}
        zIndex="4"
        position="absolute"
        top={{ base: "unset", lg: "100%" }}
        bottom={{ base: "100%", lg: "unset" }}
        gridAutoFlow="row-reverse"
      />
    </Flex>
  )
})
