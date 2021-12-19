import { useState } from "react"
import { useList } from "react-use"
import { SearchTag, SearchTags } from "@/components/discover/search-tags"
import { SearchGroup, searchGroup } from "@/client/typesense"
import { Flex, Icon, VStack } from "@chakra-ui/react"
import { QuickSearchHeader } from "@/components/search/QuickSearchContainer"
import { RiCloseLine } from "react-icons/ri"
import {
  groupsSearchToQuickSearchSection,
  QuickSearchSection,
} from "@/components/search/QuickSearchSection"
import { SearchResponseHit } from "typesense/lib/Typesense/Documents"
import { RootState, store } from "@/models/store"
import { useSelector } from "react-redux"

type GroupResult = Array<SearchResponseHit<SearchGroup>>

export function SidebarSearch() {
  const [search, setSearch] = useState("")
  const filter = useSelector((root: RootState) => root.discovery?.searchFilter)
  const [hits, setHits] = useState<GroupResult>([])

  async function changeSearch(text: string) {
    setSearch(text)
    const groups = await searchGroup(text)
    setHits(groups.hits ?? [])
  }

  const validGroups = hits.filter((hit) =>
    filter
      .filter((tag) => tag.type === "group")
      .every((tag) => tag.id !== hit.document.groupId)
  )
  return (
    <VStack align="flex-start" w="full">
      <Flex p={2} bg="rgba(0, 0, 0, 0.2)" borderRadius="md" w="full">
        <QuickSearchHeader
          fontSize="16px"
          w="full"
          placeholder="Search social media posts"
          query={search}
          onSearch={changeSearch}
          closeButton={
            search ? (
              <Icon
                as={RiCloseLine}
                cursor="pointer"
                mx={3}
                w={5}
                h={5}
                alignSelf="center"
                onClick={() => changeSearch("")}
              />
            ) : (
              <div />
            )
          }
        />
      </Flex>
      <SearchTags
        tags={filter}
        onRemove={(tag) => {
          if (tag.type === "group") {
            store.dispatch.discovery.removeGroup(tag)
          }
        }}
      />
      {validGroups.length > 0 && search && (
        <QuickSearchSection
          type="group"
          data={groupsSearchToQuickSearchSection(validGroups, (group) => {
            return {
              onClick() {
                store.dispatch.discovery.addFilter({
                  type: "group",
                  id: group.document.groupId,
                  name: group.document.name,
                })
              },
            }
          })}
        />
      )}
    </VStack>
  )
}
