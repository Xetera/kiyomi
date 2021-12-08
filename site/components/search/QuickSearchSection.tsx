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

export type QuickSearchSectionKind = "tag" | "person" | "group"

export type QuickSearchSectionData = {
  tag: {
    href: string
    tagName: string
    tagCategory?: string
    amount?: number
  }
  person: {
    href: string
    name: string
    aliases: string[]
    group?: string
    image?: string
  }
  group: {
    name: string
    href: string
  }
}

export type QuickSearchSectionProps<T extends QuickSearchSectionKind> = {
  kind: T
  data: Array<QuickSearchSectionData[T]>
}

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
          _hover={{ bg: "hsla(225, 27%, 9%, 1)" }}
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

function QuickSearchSectionGroup<T extends QuickSearchSectionKind>(
  props: QuickSearchSectionData["group"]
) {
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

function QuickSearchSectionPerson<T extends QuickSearchSectionKind>(
  props: QuickSearchSectionData["person"]
) {
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

function QuickSearchSectionTag<T extends QuickSearchSectionKind>(
  props: QuickSearchSectionData["tag"]
) {
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

export function QuickSearchSection<T extends QuickSearchSectionKind>(
  props: QuickSearchSectionProps<T>
) {
  return (
    <VStack spacing={3} alignItems="flex-start" w="full">
      <Text
        textTransform="uppercase"
        letterSpacing="1.2px"
        fontSize="13px"
        fontWeight="medium"
        color="hsla(228, 15%, 76%, 1)"
      >
        {mapping[props.kind]}
      </Text>
      <VStack w="full">
        {props.data.map((r) => {
          switch (props.kind) {
            case "tag":
              return (
                <QuickSearchSectionTag
                  {...(r as QuickSearchSectionData["tag"])}
                />
              )
            case "person":
              return (
                <QuickSearchSectionPerson
                  {...(r as QuickSearchSectionData["person"])}
                />
              )
            case "group":
              return (
                <QuickSearchSectionGroup
                  {...(r as QuickSearchSectionData["group"])}
                />
              )
            default:
              return null
          }
        })}
      </VStack>
    </VStack>
  )
}
