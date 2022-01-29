import { Flex, Grid, Heading, Stack, Text } from "@chakra-ui/layout"
import { RootState, store } from "@/models/store"
import {
  Checkbox,
  forwardRef,
  Image,
  Skeleton,
  SkeletonText,
  Spinner,
} from "@chakra-ui/react"
import { GameServerContext } from "@/models/contexts"
import React, { useCallback, useMemo } from "react"
import { PartialSearchResult } from "../../../shared/game"
import { Search } from "@/components/searchbar"
import { useSelector } from "@/hooks/useSelector"
import { personPreferredName } from "@/client/data/person-mappers"
import { Portrait } from "@/components/portrait"

interface GamePersonPickerParams {
  disabled: boolean
}

const PersonSearch = forwardRef((props, ref) => {
  const search = useSelector((root) => root.game.lobbySearchQuery)
  const onSearch = useCallback((val: string) => {
    store.dispatch.game.search(val)
  }, [])
  const searching = useSelector((root) => root.game.searchingGroup)
  return (
    <Search
      placeholder="Search for a group"
      search={search}
      searching={searching}
      onSearch={onSearch}
      debounceTime={200}
      setSearchString={(e) => store.dispatch.game.setSearch(e)}
      {...props}
      ref={ref}
    />
  )
})

const GroupCluster = React.memo(
  ({
    group,
    members,
    disabled,
    selectedPeople,
    checkMembers,
  }: PartialSearchResult & {
    disabled: boolean
    selectedPeople: string[]
    checkMembers?: (arg: number[]) => void
  }) => {
    return (
      <Flex
        key={group.id}
        flexFlow="column"
        borderColor="borderSubtle"
        borderWidth="1px"
        borderRadius="sm"
      >
        <Flex
          px={3}
          py={2}
          background="bgSecondary"
          as="label"
          alignItems="center"
          cursor="pointer"
          htmlFor={`group-check-${group.id}`}
          onClick={(_) =>
            checkMembers?.(members?.map((r) => Number(r.id)) ?? [])
          }
        >
          <Image
            src="https://placewaifu.com/image/30/30"
            background="bgSecondary"
            height="30px"
            width="30px"
            borderRadius="999px"
            mr={3}
          />
          <Flex flexFlow="column">
            <Heading fontSize="md">{group.name}</Heading>
            <Text fontSize="xs" color="gray.500" textTransform="uppercase">
              Click to select all members
            </Text>
          </Flex>
        </Flex>
        <Grid
          gridTemplateColumns="repeat(auto-fill, minmax(200px, 1fr))"
          flexFlow="row wrap"
          w="full"
        >
          {!members && (
            <Stack isLoaded={Boolean(members)} py={1} px={10}>
              {[...Array(5)].map(() => (
                <Flex height="50px" alignItems="center">
                  <Skeleton height="30px" width="30px" borderRadius="md" />
                  <Flex flexFlow="column" ml={3} flex={1}>
                    <SkeletonText noOfLines={1} mb={2} width="40%" />
                    <SkeletonText width="100%" noOfLines={1} />
                  </Flex>
                </Flex>
              ))}
            </Stack>
          )}
          {members
            // .filter((person) => (person.groups ?? []).includes(group.id))
            ?.map((person) => {
              const checked = selectedPeople.includes(person.id) ?? false
              return (
                <Flex
                  as="label"
                  alignItems="center"
                  justifyContent="center"
                  background={checked ? "bgSecondary" : "inherit"}
                  htmlFor={`person-check-${person.id}`}
                  px={3}
                  py={2}
                >
                  <Portrait
                    opacity={checked ? 1 : 0.4}
                    width="190px"
                    height="200px"
                    name={
                      <Flex alignItems="center">
                        <Checkbox
                          id={`person-check-${person.id}`}
                          mr={3}
                          onChange={() => checkMembers?.([Number(person.id)])}
                          isDisabled={disabled}
                          isChecked={checked}
                        />
                        <Text>
                          {personPreferredName({
                            name: person.name,
                            preferredAlias: { name: person.preferredAlias },
                          })}
                        </Text>
                      </Flex>
                    }
                    src={person.thumbnailSmall}
                  />
                </Flex>
              )
            })}
        </Grid>
        {!members && <Spinner />}
      </Flex>
    )
  }
)

export default function GamePersonPicker({ disabled }: GamePersonPickerParams) {
  const { send } = React.useContext(GameServerContext)
  const searchResults = useSelector((root: RootState) => root.game.searchResult)
  const searchQuery = useSelector(
    (root: RootState) => root.game.lobbySearchQuery
  )
  const selections = useSelector(
    (root: RootState) => root.game.room?.selections
  )
  const selectionArray = Object.values(selections ?? {})
  const selectedPeople = useMemo(
    () =>
      Object.values(selections ?? {}).flatMap((s) =>
        s.members.map((e) => String(e.id))
      ),
    [selections]
  )

  const results = Object.values(searchResults ?? {})

  function checkMembers(personIds: number[]) {
    send({ t: "toggle_people", people: personIds })
  }

  return (
    <Flex flexFlow="column">
      {!disabled && <PersonSearch mb={4} disabled={disabled} />}
      <Grid gridTemplateColumns={["1fr"]} gap={6}>
        {!disabled &&
          searchQuery !== "" &&
          results.map(({ group, members }) => {
            return (
              <GroupCluster
                disabled={disabled}
                selectedPeople={selectedPeople}
                group={group}
                members={members}
                key={group.id}
                checkMembers={checkMembers}
              />
            )
          })}
        {selectionArray
          .filter(
            (f) =>
              results.every(
                (res) => String(res.group.id) !== String(f.group.id)
              ) || disabled // allow non-owners to view all groups
          )
          .map(({ group, members }) => {
            return (
              <GroupCluster
                disabled={disabled}
                selectedPeople={selectedPeople}
                group={group}
                members={members}
                checkMembers={checkMembers}
                key={group.id}
              />
            )
          })}
      </Grid>
    </Flex>
  )
}
