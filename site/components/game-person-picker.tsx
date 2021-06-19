import { Flex, Grid, Heading, Text } from "@chakra-ui/layout"
import { useSelector } from "react-redux"
import { RootState, store } from "@/models/store"
import {
  Checkbox,
  forwardRef,
  InputGroup,
  InputLeftAddon,
  SkeletonText,
  Spinner,
  Image,
  Box,
} from "@chakra-ui/react"
import { GameServerContext } from "@/models/contexts"
import React, { useMemo } from "react"
import { Input } from "@chakra-ui/input"
import { useDebounce } from "react-use"
import { RiSearch2Fill, RiSearch2Line } from "react-icons/ri"
import {
  GameSelections,
  PartialSearchResult,
  PersonPool,
} from "../../shared/game"

interface GamePersonPickerParams {
  disabled: boolean
}

const Search = forwardRef((props, ref) => {
  const search = useSelector((root: RootState) => root.game.groupSearch)

  useDebounce(searchGroup, 400, [search])
  async function searchGroup() {
    store.dispatch.game.search(search)
  }

  return (
    <Flex {...props} ref={ref}>
      <InputGroup>
        <InputLeftAddon background="bgSecondary">
          <RiSearch2Line />
        </InputLeftAddon>
        <Input
          disabled={props.disabled}
          borderColor="borderSubtle"
          value={search}
          placeholder="Search for a group"
          onChange={(e) => store.dispatch.game.setSearch(e.target.value)}
          width="100%"
        />
      </InputGroup>
    </Flex>
  )
})

function GroupCluster({
  group,
  members,
  disabled,
  selectedPeople,
  checkMembers,
}: PartialSearchResult & {
  disabled: boolean
  selectedPeople: number[]
  checkMembers?: (arg: number[]) => void
}) {
  // const members = personPool.flatMap(res => res.members)
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
        background="brand.800"
        as="label"
        alignItems="center"
        cursor="pointer"
        htmlFor={`group-check-${group.id}`}
        onClick={(_) => checkMembers?.(members?.map((r) => r.id) ?? [])}
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
            placeholder data
          </Text>
        </Flex>
      </Flex>
      <Box>
        <SkeletonText
          isLoaded={Boolean(members)}
          noOfLines={6}
          skeletonHeight={4}
        >
          {members
            // .filter((person) => (person.groups ?? []).includes(group.id))
            ?.map((person) => {
              const checked = selectedPeople.includes(person.id) ?? false
              return (
                <Flex
                  as="label"
                  alignItems="center"
                  background={checked ? "bgSecondary" : "inherit"}
                  htmlFor={`person-check-${person.id}`}
                  px={3}
                  py={2}
                  width="100%"
                >
                  <Checkbox
                    id={`person-check-${person.id}`}
                    // size="sm"
                    mr={3}
                    onChange={() => checkMembers?.([person.id])}
                    isDisabled={disabled}
                    isChecked={checked}
                  />
                  <Image
                    src="https://placewaifu.com/image/31/31"
                    background="bgSecondary"
                    height="30px"
                    width="30px"
                    borderRadius="md"
                    mr={3}
                  />
                  <Flex flexFlow="column">
                    <Flex fontSize="sm" color="gray.300">
                      {person.name}
                    </Flex>
                    <Flex color="gray.500" fontSize="xs" flexWrap="wrap">
                      {person.aliases.map((alias) => (
                        <Text key={alias} mr={1} whiteSpace="nowrap">
                          {alias}
                        </Text>
                      ))}
                    </Flex>
                  </Flex>
                </Flex>
              )
            })}
        </SkeletonText>
      </Box>
      {!members && <Spinner />}
    </Flex>
  )
}

export default function GamePersonPicker({ disabled }: GamePersonPickerParams) {
  const { send } = React.useContext(GameServerContext)
  const searchResults = useSelector((root: RootState) => root.game.searchResult)
  const selections = useSelector(
    (root: RootState) => root.game.room?.selections
  )
  const selectionArray = Object.values(selections ?? {})
  const selectedPeople = useMemo(
    () =>
      Object.values(selections ?? {}).flatMap((s) =>
        s.members.map((e) => e.id)
      ),
    [selections]
  )
  // const room = useSelector((root: RootState) => root.game.room)
  const results = Object.values(searchResults ?? {})
  // const people = Object.values(peopleMap)
  // console.log(people.filter((p) => !p.groups))

  function checkMembers(personIds: number[]) {
    // if (!room) {
    //   return console.log("No room?")
    // }
    // const personIds = searchResults[groupId]?.members.map((mem) => mem.id) ?? []
    send({ t: "toggle_people", people: personIds })
  }
  function checkPerson() {}
  return (
    <Flex flexFlow="column">
      {!disabled && <Search mb={4} disabled={disabled} />}
      <Grid
        gridTemplateColumns={[
          "1fr",
          null,
          null,
          "1fr 1fr",
          null,
          "1fr 1fr 1fr",
        ]}
        gap={6}
      >
        {!disabled &&
          results.map(({ group, members }) => (
            <GroupCluster
              disabled={disabled}
              selectedPeople={selectedPeople}
              group={group}
              members={members}
              key={group.id}
              checkMembers={checkMembers}
            />
          ))}
        {selectionArray
          .filter(
            (f) =>
              !results.some((res) => res.group.id === f.group.id) || disabled // allow non-owners to view all groups
          )
          .map(({ group, members }) => (
            <GroupCluster
              disabled={disabled}
              selectedPeople={selectedPeople}
              group={group}
              members={members}
              checkMembers={checkMembers}
              key={group.id}
            />
          ))}
      </Grid>
    </Flex>
  )
}
