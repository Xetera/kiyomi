import { useSelector } from "react-redux"
import { RootState, store } from "@/models/store"
import {
  QuickSearchContainer,
  QuickSearchHeader,
} from "@/components/search/QuickSearchContainer"
import React, { useEffect } from "react"
import { QuickSearchSection } from "@/components/search/QuickSearchSection"
import { SearchResponseHit } from "typesense/lib/Typesense/Documents"
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react"

export function QuickSearch() {
  const { query, idols, groups } = useSelector((root: RootState) => root.search)
  const runSearch = (query: string) => store.dispatch.search.setSearch(query)

  useEffect(() => {
    store.dispatch.search.runSearch(query)
  }, [query])

  function extractFieldOr(
    hit: SearchResponseHit<any>,
    name: string
  ): string | string[] | undefined {
    const field = hit.highlights?.find(({ field }) => field === name)
    if (field?.snippets) {
      return field.snippets
    }
    return field?.snippet ?? hit.document[name]
  }

  return (
    <Modal
      isOpen
      onClose={() => {}}
      closeOnOverlayClick
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <ModalContent
        backdropFilter="blur(10px)"
        bg="hsla(231, 28%, 7%, 0.8)"
        overflow="hidden"
        borderRadius="md"
      >
        <ModalHeader p={2}>
          <QuickSearchHeader query={query} onSearch={runSearch} />
        </ModalHeader>
        <ModalBody p="0">
          <QuickSearchContainer>
            {idols.length > 0 && (
              <QuickSearchSection
                type="person"
                data={idols.map((idol) => ({
                  href: "/",
                  aliases: (extractFieldOr(idol, "aliases") ?? []) as string[],
                  name: extractFieldOr(idol, "name") as string,
                }))}
              />
            )}
            {groups.length > 0 && (
              <QuickSearchSection
                type="group"
                data={groups.map((group) => ({
                  href: "/",
                  name: extractFieldOr(group, "name") as string,
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
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
