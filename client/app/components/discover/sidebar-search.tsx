import { useCallback, useState } from "react"
import { useList } from "react-use"
import { SearchTag, SearchTags } from "~/components/discover/search-tags"
import { SearchGroup, searchGroup } from "~/client/typesense"
import { Flex, forwardRef, Icon, VStack } from "@chakra-ui/react"
import { QuickSearchHeader } from "~/components/search/QuickSearchContainer"
import { RiCloseLine } from "react-icons/ri"
import {
  groupsSearchToQuickSearchSection,
  idolsSearchToQuickSearchSection,
  QuickSearchSection,
  QuickSearchSectionKind,
  SearchSectionMappings,
} from "~/components/search/QuickSearchSection"
import {
  SearchResponse,
  SearchResponseHit,
} from "typesense/lib/Typesense/Documents"
import { RootState, store } from "@/models/store"
import { useSelector } from "react-redux"
import { SearchFilterHandle } from "~/hooks/useSearchFilter"

export type GroupSearchResult = SearchResponseHit<SearchGroup>

type SidebarSearchProps<
  T extends QuickSearchSectionKind
> = SearchFilterHandle & {
  searchType: "group"
  hits: GroupSearchResult[]
  setHits: (result: GroupSearchResult[]) => void
  placeholder?: string
  // deriveTag: (tag: SearchSectionMappings[T]) => SearchTag
  runSearch?: (input: string) => Promise<GroupSearchResult[]>
}

export const SidebarSearch = forwardRef<SidebarSearchProps<"group">, "div">(
  (
    {
      hits,
      setHits,
      filters,
      addFilter,
      runSearch = (text) => searchGroup(text).then((r) => r.hits ?? []),
      removeFilter,
      searchType,
      placeholder,
      ...rest
    },
    ref
  ) => {
    const [search, setSearch] = useState("")

    async function changeSearch(text: string) {
      setSearch(text)
      const groups = await runSearch(text)
      setHits(groups ?? [])
    }

    const validGroups = hits.filter((hit) =>
      filters
        .filter((tag) => tag.type === searchType)
        .every((tag) => tag.id !== hit.document.groupId)
    )
    const onRemove = useCallback(
      (tag: SearchTag) => {
        if (tag.type === "group") {
          removeFilter(tag)
        }
      },
      [removeFilter]
    )
    return (
      <VStack align="flex-start" w="full" {...rest} ref={ref}>
        <Flex p={2} bg="rgba(0, 0, 0, 0.2)" borderRadius="md" w="full">
          <QuickSearchHeader
            fontSize="16px"
            w="full"
            placeholder={placeholder ?? "Search social media posts"}
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
        <SearchTags tags={filters} onRemove={onRemove} />
        {validGroups.length > 0 && search && (
          <QuickSearchSection
            type={searchType}
            data={groupsSearchToQuickSearchSection(validGroups, (group) => {
              return {
                onClick() {
                  addFilter({
                    type: searchType,
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
)
