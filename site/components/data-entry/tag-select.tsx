import { useBoolean, useList } from "react-use"
import { ChangeEventHandler, useCallback, useRef, useState } from "react"
import { SearchTag, searchTag as typesenseSearchTag } from "@/client/typesense"
import { SearchResponseHit } from "typesense/lib/Typesense/Documents"
import {
  Box,
  Button,
  Flex,
  forwardRef,
  HStack,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react"
import { EditableTag } from "@/components/data-entry/editable-tag"
import { RiAddLine, RiArrowRightLine } from "react-icons/ri"
import Hr from "@/components/hr"
import useToast from "@/hooks/useToast"

export const useTagSelect = (defaultTags: string[]) => {
  const [tags, t] = useList(defaultTags)
  const addTag = useCallback((name: string) => {
    t.push(name)
  }, [])
  const removeTag = useCallback((name: string) => {
    const index = tags.indexOf(name)
    if (index === -1) {
      return // handle error?
    }
    t.removeAt(index)
  }, [])

  return {
    tags,
    addTag,
  }
}

export type UseTagSelect = ReturnType<typeof useTagSelect>

type TagHandling = {
  onCreate(tagName: string): Promise<void>
  onDelete(tagName: string): Promise<void>
  onAdd(tagName: string): void
}

export type TagHintsProps = Omit<TagHandling, "onDelete"> & {
  hints: Array<SearchResponseHit<SearchTag>>
  searchText: string
}

const TagHints = forwardRef<TagHintsProps, "div">(
  ({ hints, searchText, onCreate, onAdd, ...rest }, ref) => {
    const rowProps = {
      px: 2,
      py: 2,
      tabindex: "0",
      m: 0,
      appearance: "none",
      h: "min-content",
      bg: "transparent",
      justifyContent: "flex-start",
      display: "flex",
      align: "center",
      _hover: {
        bg: "borderSubtle",
      },
    } as const
    const add = (
      <Button
        {...rowProps}
        overflow="hidden"
        textOverflow="ellipsis"
        whiteSpace="nowrap"
        onClick={() => onCreate(searchText)}
      >
        <RiAddLine />
        <Text textStyle="heading-sm" ml={2} fontSize="12px">
          Add
          <Box as="span" color="brand.300" mx={1}>
            {searchText}
          </Box>
        </Text>
      </Button>
    )

    const shouldShowAdd =
      searchText !== "" &&
      !hints
        .flatMap((hint) =>
          (hint.document.aliases ?? []).concat([
            hint.document.name.toLowerCase(),
          ])
        )
        .includes(searchText.trim().toLowerCase())

    if (searchText === "") {
      return null
    }

    return (
      <Flex
        zIndex={3}
        w="full"
        ref={ref}
        p={2}
        fontSize="12px"
        bg="bgSecondary"
        direction="column"
        borderRadius="md"
        {...rest}
      >
        {hints.map((h) => {
          const highlight = h.highlights?.[0]
          const { field, snippet = "", snippets = [""], value } =
            highlight || {}
          return (
            <Button
              {...rowProps}
              w="full"
              onClick={() => onAdd(h.document.name)}
              className="highlight-em"
              key={h.document.id}
            >
              <Flex
                justify="space-between"
                w="full"
                align="center"
                fontSize="12px"
              >
                <Flex flexFlow="row wrap" flex="1 0 auto">
                  {field === "aliases" ? (
                    <HStack align="center">
                      <Text
                        dangerouslySetInnerHTML={{ __html: snippets[0] ?? "" }}
                      />
                      <RiArrowRightLine />
                      <Text>{h.document.name}</Text>
                    </HStack>
                  ) : (
                    <Text dangerouslySetInnerHTML={{ __html: snippet ?? "" }} />
                  )}
                </Flex>
                <Flex ml={3}>
                  <Text
                    fontSize="12px"
                    fontColor="gray.800"
                    fontWeight="normal"
                  >
                    {h.document.count}
                  </Text>
                </Flex>
              </Flex>
            </Button>
          )
        })}
        {shouldShowAdd && (
          <>
            {hints.length > 0 && (
              <Hr borderColor="borderSubtle" w="full" my={2} />
            )}
            {add}
          </>
        )}
      </Flex>
    )
  }
)

export type TagInputProps = Omit<TagHandling, "onDelete">

export const TagInput = forwardRef<TagInputProps, "input">((p, ref) => {
  const [newTagText, setNewTagText] = useState("")
  const [tagHints, h] = useList<SearchResponseHit<SearchTag>>([])
  const [showHints, setShowHints] = useBoolean(false)
  const searchTag = useCallback(
    async (tagName: string) => {
      if (tagName === "") {
        // clear tags if not searching
        h.set([])
        return
      }
      const tag = await typesenseSearchTag(tagName)
      if (!tag.hits) {
        return // ?
      }
      h.set(tag.hits)
    },
    [h]
  )

  function withTextReset<T>(f: (name: string) => T) {
    return (name: string) => {
      setNewTagText("")
      return f(name)
    }
  }

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const search = e.target.value
    setNewTagText(search)
    searchTag(search)
  }

  return (
    <VStack position="relative" spacing={4}>
      <Input
        ref={ref}
        onChange={onChange}
        value={newTagText}
        fontSize="14px"
        placeholder="Add a tag"
        onFocus={() => setShowHints(true)}
        // onBlur={() => setShowHints(false)}
      />
      {showHints && (
        <TagHints
          position="absolute"
          top="100%"
          w="max-content"
          minW="100%"
          display="flex"
          maxW="180%"
          hints={tagHints}
          searchText={newTagText}
          onAdd={withTextReset(p.onAdd)}
          onCreate={withTextReset(p.onCreate)}
        />
      )}
    </VStack>
  )
})

export const TagSelect = (props: UseTagSelect & TagHandling) => {
  const [tags, t] = useList(props.tags)
  const ref = useRef<HTMLInputElement>(null)
  const toast = useToast("error")

  function tryWith<T>(f: () => Promise<T>): Promise<T> {
    return f().catch((err) => {
      toast({
        description: err.message,
      })
      throw err
    })
  }

  async function onDelete(name: string) {
    const index = tags.indexOf(name)
    if (index > -1) {
      t.removeAt(index)
      return tryWith(() => props.onDelete(name)).catch(() => {
        t.insertAt(index, name)
      })
    }
  }

  async function onAdd(name: string) {
    t.push(name)
    ref.current?.focus()
    tryWith(() => props.onCreate(name)).catch(() => {
      t.filter((tag) => tag !== name)
    })
  }

  return (
    <VStack spacing={3}>
      <TagInput onAdd={onAdd} onCreate={onAdd} ref={ref} />
      <Flex flexFlow="row wrap">
        {tags.map((tag) => (
          <EditableTag
            name={tag}
            key={tag}
            mr={2}
            mb={2}
            onClose={() => onDelete(tag)}
          >
            {tag}
          </EditableTag>
        ))}
      </Flex>
    </VStack>
  )
}
