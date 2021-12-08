import { useSelector } from "react-redux"
import { RootState, store } from "@/models/store"
import { QuickSearchContainer } from "@/components/search/QuickSearchContainer"
import { useEffect } from "react"
import { QuickSearchSection } from "@/components/search/QuickSearchSection"

export function QuickSearch() {
  const { query, idols, groups } = useSelector((root: RootState) => root.search)
  const runSearch = (query: string) => store.dispatch.search.setSearch(query)

  useEffect(() => {
    store.dispatch.search.runSearch(query)
  }, [query])

  return (
    <QuickSearchContainer query={query} onSearch={runSearch}>
      {idols.length > 0 && (
        <QuickSearchSection
          kind="person"
          data={idols.map((idol) => ({
            href: "/",
            aliases: idol._formatted.aliases,
            name: idol._formatted.name,
          }))}
        />
      )}
      {groups.length > 0 && (
        <QuickSearchSection
          kind="group"
          data={groups.map((group) => ({
            href: "/",
            name: group._formatted.name,
          }))}
        />
      )}
      {/*<QuickSearchSection*/}
      {/*  kind="tag"*/}
      {/*  data={[*/}
      {/*    {*/}
      {/*      href: "/",*/}
      {/*      amount: 1234,*/}
      {/*      tagName: "Blonde",*/}
      {/*      tagCategory: "Hair",*/}
      {/*    },*/}
      {/*    {*/}
      {/*      href: "/",*/}
      {/*      tagName: "Waving",*/}
      {/*      tagCategory: "Poses",*/}
      {/*    },*/}
      {/*    {*/}
      {/*      tagName: "Laying Down",*/}
      {/*      href: "/",*/}
      {/*    },*/}
      {/*  ]}*/}
      {/*/>*/}
    </QuickSearchContainer>
  )
}
