import { HStack, Image, Link, Text, VStack } from "@chakra-ui/react"
import { IoPricetag } from "react-icons/io5"
import { Flex } from "@chakra-ui/layout"
import NextLink from "next/link"
import { useEffect, useState } from "react"
import { IoIosReturnLeft } from "react-icons/io"
import { useKeyPress } from "react-use"
import { useRouter } from "next/router"
import { FaUserCircle } from "react-icons/fa"
import { RiAccountPinCircleLine } from "react-icons/ri"
import { intersperse } from "@/client/jsx-helpers"

type QuickSearchTag = {
  href: string
  tagName: string
  tagCategory?: string
  amount?: number
}

type QuickSearchPerson = {
  href: string
  name: string
  aliases: string[]
  image?: string
}

type QuickSearchGroup = {
  name: string
  href: string
}

type QuickSearchSection =
  | {
      type: "tag"
      data: QuickSearchTag[]
    }
  | { type: "person"; data: QuickSearchPerson[] }
  | {
      type: "group"
      data: QuickSearchGroup[]
    }

export type QuickSearchSectionKind = "tag" | "person" | "group"

const mapping: Record<QuickSearchSectionKind, string> = {
  tag: "tags",
  person: "people",
  group: "groups",
}

const formatter = new Intl.NumberFormat()

function QuickSearchSectionGeneric(props) {
  const router = useRouter()
  const [hovering, isHovering] = useState(false)
  const [pressed] = useKeyPress((e) => e.key === "return")
  useEffect(() => {
    if (pressed) {
      router.push(props.href)
    }
  }, [pressed])
  return (
    <NextLink href={props.href} passHref>
      <Link
        className="highlight-em"
        w="full"
        _hover={{ textDecoration: "none" }}
        onFocusCapture={() => isHovering(true)}
        onBlur={() => isHovering(false)}
      >
        <Flex
          display="flex"
          justify="space-between"
          px={3}
          py={2}
          w="full"
          borderColor="transparent"
          borderWidth="1px"
          _hover={{ borderColor: "hsla(228,26%,16%,0.7)" }}
          transition="all 0.2s ease-in-out"
          borderRadius="md"
          align="center"
        >
          {props.left}
          {hovering ? (
            <Flex align="center" color="gray.500">
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
  return (
    <QuickSearchSectionGeneric
      href={props.href}
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
  return (
    <QuickSearchSectionGeneric
      href={props.href}
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

export function QuickSearchSection(props: QuickSearchSection) {
  return (
    <VStack spacing={3} alignItems="flex-start" w="full">
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