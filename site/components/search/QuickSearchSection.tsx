import {
  Button,
  forwardRef,
  HStack,
  Image,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react"
import { IoPricetag } from "react-icons/io5"
import { Box, Flex } from "@chakra-ui/layout"
import NextLink from "next/link"
import { useEffect, useState } from "react"
import { IoIosReturnLeft } from "react-icons/io"
import { useKeyPress } from "react-use"
import { useRouter } from "next/router"
import { FaUserCircle } from "react-icons/fa"
import { RiAccountPinCircleLine } from "react-icons/ri"
import { intersperse } from "@/client/jsx-helpers"
import { SearchResponseHit } from "typesense/lib/Typesense/Documents"
import { SearchGroup, SearchIdol } from "@/client/typesense"

export type QuickSearchTag = {
  href: string
  tagName: string
  tagCategory?: string
  amount?: number
}

export type QuickSearchPerson = {
  name: string
  aliases: string[]
  image?: string
} & ({ onClick: () => void } | { href: string })

export type QuickSearchGroup = {
  name: string
} & ({ onClick: () => void } | { href: string })

export type SearchSectionMappings = {
  tag: QuickSearchTag[]
  person: QuickSearchPerson[]
  group: QuickSearchGroup[]
}

type QuickSearchSection = {
  [Key in QuickSearchSectionKind]: {
    type: Key
    data: SearchSectionMappings[Key]
  }
}[QuickSearchSectionKind]

export type QuickSearchSectionKind = keyof SearchSectionMappings

const mapping: Record<QuickSearchSectionKind, string> = {
  tag: "tags",
  person: "people",
  group: "groups",
}

const formatter = new Intl.NumberFormat()

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

export function idolsSearchToQuickSearchSection(
  idols: Array<SearchResponseHit<SearchIdol>>,
  destinationMapper: (
    group: SearchResponseHit<SearchIdol>
  ) => { href: string } | { onClick: () => void } = () => ({ href: "/" })
): QuickSearchPerson[] {
  return idols.map((idol) => ({
    ...destinationMapper(idol),
    aliases: (extractFieldOr(idol, "aliases") ?? []) as string[],
    name: extractFieldOr(idol, "name") as string,
  }))
}

export function groupsSearchToQuickSearchSection(
  groups: Array<SearchResponseHit<SearchGroup>>,
  destinationMapper: (
    group: SearchResponseHit<SearchGroup>
  ) => { href: string } | { onClick: () => void } = () => ({ href: "/" })
): QuickSearchGroup[] {
  return groups.map((group) => ({
    ...destinationMapper(group),
    name: extractFieldOr(group, "name") as string,
  }))
}

function QuickSearchSectionGeneric(props) {
  const router = useRouter()
  const [hovering, isHovering] = useState(false)
  const [pressed] = useKeyPress((e) => e.key === "return")
  useEffect(() => {
    if (pressed) {
      router.push(props.href)
    }
  }, [pressed])

  const component = (
    <Flex
      display="flex"
      justify="space-between"
      w="full"
      maxW="full"
      borderColor="transparent"
      borderWidth="1px"
      transition="all 0.2s ease-in-out"
      borderRadius="md"
      overflow="hidden"
      align="center"
    >
      <Flex flex="1 0 auto">{props.left}</Flex>
      {hovering ? (
        <Flex align="center" color="gray.500" flex="1">
          <Text fontSize="14px" fontWeight="medium">
            Select
          </Text>
          <Flex
            px={2}
            py={1}
            ml={2}
            bg="hsla(225, 27%, 12%, 1)"
            borderRadius="md"
          >
            <IoIosReturnLeft />
          </Flex>
        </Flex>
      ) : (
        props.right
      )}
    </Flex>
  )
  if ("onClick" in props) {
    return (
      <Button
        appearance="none"
        bg="transparent"
        px={3}
        py={2}
        h="full"
        className="highlight-em"
        w="full"
        _hover={{
          textDecoration: "none",
          borderColor: "hsla(228,26%,16%,0.7)",
        }}
        onClick={props.onClick}
        onFocusCapture={() => isHovering(true)}
        onBlur={() => isHovering(false)}
      >
        {component}
      </Button>
    )
  }
  return (
    <NextLink href={props.href} passHref>
      <Link
        className="highlight-em"
        w="full"
        cursor="pointer"
        _hover={{
          textDecoration: "none",
          borderColor: "hsla(228,26%,16%,0.7)",
        }}
        onFocusCapture={() => isHovering(true)}
        onBlur={() => isHovering(false)}
      >
        {component}
      </Link>
    </NextLink>
  )
}

const HorizontalElems = ({ children }) => (
  <HStack spacing={5}>{children}</HStack>
)
const VerticalElems = ({ children }) => (
  <VStack spacing={0} align="flex-start">
    {children}
  </VStack>
)

function QuickSearchSectionGroup(props: QuickSearchGroup) {
  const p = "href" in props ? { href: props.href } : { onClick: props.onClick }
  return (
    <QuickSearchSectionGeneric
      {...p}
      left={
        <HorizontalElems>
          <RiAccountPinCircleLine color="hsla(226, 28%, 25%, 1)" size={32} />
          <VerticalElems>
            <Text
              fontSize="md"
              fontWeight="medium"
              dangerouslySetInnerHTML={{ __html: props.name }}
            />
          </VerticalElems>
        </HorizontalElems>
      }
    />
  )
}

function QuickSearchSectionPerson(props: QuickSearchPerson) {
  const p = "href" in props ? { href: props.href } : { onClick: props.onClick }
  return (
    <QuickSearchSectionGeneric
      {...p}
      left={
        <HorizontalElems>
          {props.image ? (
            <Image
              src={props.image}
              alt={props.name}
              w={8}
              objectFit="cover"
              borderRadius="full"
            />
          ) : (
            <FaUserCircle color="hsla(226, 28%, 25%, 1)" size={32} />
          )}
          <VerticalElems>
            <Text
              fontSize="md"
              fontWeight="medium"
              dangerouslySetInnerHTML={{ __html: props.name }}
            />
            {props.aliases && (
              <HStack spacing={1}>
                {intersperse(
                  props.aliases
                    .slice(0, 3)
                    .map((alias) => (
                      <Text
                        fontSize="xs"
                        color="gray.500"
                        dangerouslySetInnerHTML={{ __html: alias }}
                      />
                    )),
                  () => (
                    <Text fontSize="xs" color="gray.500">
                      •
                    </Text>
                  )
                )}
              </HStack>
            )}
          </VerticalElems>
        </HorizontalElems>
      }
    />
  )
}

function QuickSearchSectionTag(props: QuickSearchTag) {
  return (
    <QuickSearchSectionGeneric
      href={props.href}
      left={
        <HorizontalElems>
          <IoPricetag color="hsla(226, 28%, 25%, 1)" size={32} />
          <VerticalElems>
            <Text fontSize="md" fontWeight="medium">
              {props.tagName}
            </Text>
            {props.tagCategory && (
              <Text fontSize="xs" color="gray.500">
                {props.tagCategory}
              </Text>
            )}
          </VerticalElems>
        </HorizontalElems>
      }
      right={
        props.amount &&
        props.amount > 0 && (
          <Text color="gray.400" fontSize="sm" fontWeight="medium">
            {formatter.format(props.amount)}
          </Text>
        )
      }
    />
  )
}

export const QuickSearchSection = forwardRef<QuickSearchSection, "div">(
  (props, ref) => {
    return (
      <VStack spacing={3} alignItems="flex-start" w="full" ref={ref} {...props}>
        <Text
          textTransform="uppercase"
          letterSpacing="1.2px"
          fontSize="13px"
          fontWeight="medium"
          color="hsla(228, 15%, 76%, 1)"
        >
          {mapping[props.type]}
        </Text>
        <VStack w="full">
          {props.data.map((r) => {
            switch (props.type) {
              case "tag":
                return <QuickSearchSectionTag {...r} />
              case "person":
                return <QuickSearchSectionPerson {...r} />
              case "group":
                return <QuickSearchSectionGroup {...r} />
            }
          })}
        </VStack>
      </VStack>
    )
  }
)
