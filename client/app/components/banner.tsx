import {
  Box,
  Flex,
  FlexProps,
  Image,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react"
import { ReactElement, ReactNode } from "react"
import { TabGenerator } from "./linked-tabs"

export const PageBannerTopic: React.FC = ({ children }) => (
  <Text
    as="h2"
    fontSize={["12px", null, "18px", "24px"]}
    color="text.80"
    fontWeight="semibold"
  >
    {children}
  </Text>
)

export const makePageBannerRoute = (text: string): TabGenerator => ({
  selected,
}) => (
  <>
    <Flex
      h="full"
      // py={2}
      borderRadius="md"
      // bg="linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0,0,0))"
      fontWeight="semibold"
      fontSize={["18px"]}
      color={selected ? "text.100" : "text.40"}
      position="relative"
      // borderBottomWidth={selected ? "1px" : "0"}
      borderColor="brand.100"
      py={3}
    >
      {text}
    </Flex>
    {selected && (
      <Flex position="absolute" bottom="0" h="2px" w="full" bg="red" />
    )}
  </>
)

export const PageBannerTitle: React.FC = ({ children }) => (
  <Text
    as="h1"
    fontSize={["24px", "36px", "48px", "56px"]}
    color="text.100"
    fontWeight="bold"
  >
    {children}
  </Text>
)

export const PageBannerSubtitle: React.FC = ({ children }) => (
  <Text as="h1" fontSize={["18px"]} color="text.80" fontWeight="regular">
    {children}
  </Text>
)

export type PageBannerProps = {
  topic: ReactNode
  title: ReactNode
  subtitle?: ReactNode
  router: ReactNode
  backgroundUrl?: string
  actions?: ReactElement
  height?: FlexProps["height"]
}

export const PageBanner = ({
  topic,
  title,
  subtitle,
  router,
  backgroundUrl,
  actions,
  height = ["400px", null, "50vh", null, "65vh"],
}: PageBannerProps) => {
  return (
    <Flex
      as="header"
      maxH={height}
      h="full"
      w="full"
      position="relative"
      overflow="hidden"
    >
      <Image
        src={backgroundUrl}
        w="full"
        position="absolute"
        opacity={0.5}
        objectFit="cover"
        height="full"
        objectPosition="50% 10%"
        sx={{
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.25) 100%)",
          // "linear-gradient(to bottom, rgba(0, 0, 0, 0.4) 2%, rgba(0, 0, 0, 0.7) 10%, rgba(0, 0,0, 0.8) 18%, rgba(0, 0, 0, 1) 24%, rgba(0, 0, 0, 0.841) 34%, rgba(0, 0, 0, 0.782) 47%, rgba(0, 0, 0, 0.498) 56.5%, rgba(0, 0, 0, 0.324) 65%, rgba(0, 0, 0, 0.256) 73%, rgba(0, 0, 0, 0.135) 80.2%, rgba(0, 0, 0, 0.102) 86.1%, rgba(0, 0, 0, 0.051) 91%, rgba(0, 0, 0, 0.015) 95.2%, rgba(0, 0, 0, 0.010) 98.2%, transparent 100%);",
        }}
      />
      <Flex
        // maxW="7xl"
        w="full"
        mx="auto"
        position="absolute"
        flexDirection="column"
        h="full"
        left={0}
        right={0}
        bottom={0}
      >
        <Flex maxW="7xl" w="full" mx="auto" h="full" px={6} py={3}>
          <Flex position="relative" w="full" alignItems="flex-end">
            <VStack spacing={6} position="absolute">
              <VStack spacing={0}>
                {topic}
                {title}
                {/*{subtitle}*/}
              </VStack>
            </VStack>
          </Flex>
        </Flex>
        <Box w="full" borderColor="rgba(0, 0, 0, 0.1)" />
        <Flex maxW="7xl" w="full" mx="auto" px={6} overflow="hidden">
          {router}
        </Flex>
      </Flex>
    </Flex>
  )
}
