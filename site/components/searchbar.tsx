import {
  forwardRef,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  InputRightAddon,
  Spinner,
} from "@chakra-ui/react"
import { useDebounce } from "react-use"
import { Flex } from "@chakra-ui/layout"
import { RiCloseCircleLine, RiSearch2Line } from "react-icons/ri"
import { Input } from "@chakra-ui/input"
import React from "react"

type SearchProps = {
  search: string
  searching: boolean
  setSearchString: (val: string) => void
  onSearch: (val: string) => void
  hasClearButton?: boolean
  onEnter?: () => void
  debounceTime?: number
  autoFocus?: boolean
  placeholder: string
}

export const Search = forwardRef<SearchProps, "div">((props, ref) => {
  const {
    search,
    searching,
    hasClearButton = false,
    debounceTime = 400,
    setSearchString,
    placeholder,
    onEnter,
    onSearch,
    autoFocus = false,
    ...rest
  } = props

  useDebounce(() => onSearch(search), debounceTime, [search])

  return (
    <Flex {...rest} ref={ref}>
      <InputGroup>
        <InputLeftAddon
          background="bgPrimary"
          color="gray.400"
          display={{ base: "none", lg: "flex" }}
        >
          {searching ? <Spinner size="sm" /> : <RiSearch2Line />}
        </InputLeftAddon>
        <Input
          borderColor="borderSubtle"
          value={search}
          autoFocus={autoFocus}
          placeholder={placeholder}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              onEnter?.()
            }
          }}
          onChange={(e) => {
            setSearchString(e.target.value)
          }}
          width="100%"
        />
        {search && hasClearButton && (
          <InputRightAddon
            background="bgPrimary"
            cursor="pointer"
            color="gray.400"
            onClick={() => setSearchString("")}
          >
            <RiCloseCircleLine color="inherit" />
          </InputRightAddon>
        )}
      </InputGroup>
    </Flex>
  )
})
