import {
  forwardRef,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Spinner,
} from "@chakra-ui/react"
import { useDebounce } from "react-use"
import { store } from "@/models/store"
import { Flex } from "@chakra-ui/layout"
import { RiCloseCircleLine, RiSearch2Line } from "react-icons/ri"
import { Input } from "@chakra-ui/input"
import React from "react"

type SearchProps = {
  search: string
  searching: boolean
  setSearch: (val: string) => void
  placeholder: string
}

export const Search = forwardRef<SearchProps, "div">((props, ref) => {
  const { search, searching, setSearch, placeholder } = props

  useDebounce(searchGroup, 400, [search])
  async function searchGroup() {
    store.dispatch.game.search(search)
  }

  return (
    <Flex {...props} ref={ref}>
      <InputGroup>
        <InputLeftAddon background="bgPrimary">
          {searching ? <Spinner size="sm" /> : <RiSearch2Line />}
        </InputLeftAddon>
        <Input
          // disabled={props.disabled}
          borderColor="borderSubtle"
          value={search}
          placeholder={placeholder}
          onChange={(e) => setSearch(e.target.value)}
          width="100%"
        />
        {search && (
          <InputRightAddon
            background="bgPrimary"
            cursor="pointer"
            color="gray.400"
            onClick={() => setSearch("")}
          >
            <RiCloseCircleLine color="inherit" />
          </InputRightAddon>
        )}
      </InputGroup>
    </Flex>
  )
})
