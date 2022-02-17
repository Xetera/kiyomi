import { useSelector } from "react-redux"
import { RootState, store } from "@/models/store"
import {
  QuickSearchContainer,
  QuickSearchHeader,
} from "~/components/search/QuickSearchContainer"
import React, { useEffect } from "react"
import {
  groupsSearchToQuickSearchSection,
  idolsSearchToQuickSearchSection,
  QuickSearchSection,
} from "~/components/search/QuickSearchSection"
import { SearchResponseHit } from "typesense/lib/Typesense/Documents"
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react"
import { AnimatePresence } from "framer-motion"

export type QuickSearchProps = { onClose: () => void }

export function QuickSearch({ onClose }: QuickSearchProps) {
  const { query, idols, groups } = useSelector((root: RootState) => root.search)
  const runSearch = (query: string) => store.dispatch.search.setSearch(query)

  useEffect(() => {
    store.dispatch.search.runSearch(query)
  }, [query])

  return (
    <AnimatePresence>
      <Modal
        isOpen
        onClose={onClose}
        closeOnOverlayClick
        scrollBehavior="inside"
        closeOnEsc
      >
        <ModalOverlay />
        <ModalContent
          sx={{ colorScheme: "dark" }}
          backdropFilter="blur(10px)"
          bg="hsla(231, 28%, 7%, 0.8)"
          overflow="hidden"
          borderRadius="md"
        >
          <ModalHeader p={2} fontSize="lg">
            <QuickSearchHeader
              query={query}
              onSearch={runSearch}
              closeButton={<ModalCloseButton />}
            />
          </ModalHeader>
          <ModalBody p="0">
            <QuickSearchContainer>
              {idols.length > 0 && (
                <QuickSearchSection
                  type="person"
                  onClick={onClose}
                  data={idolsSearchToQuickSearchSection(idols)}
                />
              )}
              {groups.length > 0 && (
                <QuickSearchSection
                  type="group"
                  onClick={onClose}
                  data={groupsSearchToQuickSearchSection(groups)}
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
    </AnimatePresence>
  )
}
