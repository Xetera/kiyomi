import { RiCheckLine, RiTwitterLine } from "react-icons/ri"
import { DiscoveredPostsQuery } from "@/lib/__generated__/graphql"
import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  HStack,
  Image,
  Link,
  VStack,
} from "@chakra-ui/react"
import { Flex, Text } from "@chakra-ui/layout"
import formatDistance from "date-fns/formatDistance"
import { DiscoveredImageGrid } from "./discovered-image-grid"

export type ProviderIconProps = {
  providerType: string
}

function decideProvider(
  providerType: string
): { component?: React.ReactElement; label: string } {
  switch (providerType) {
    case "WeverseArtistFeed":
      return {
        component: (
          <Image src="/provider-icons/weverse.svg" alt="Weverse App" />
        ),
        label: "Weverse",
      }
    case "TwitterFeed":
      return { component: <RiTwitterLine size={24} />, label: "Twitter" }
    default:
      return { label: "Unknown" }
  }
}

export type DiscoveredPostProps = {
  post: DiscoveredPostsQuery["discoveredPosts"][number]
}

export function DiscoveredPost({ post }: DiscoveredPostProps) {
  const { component, label } = decideProvider(post.providerType)
  return (
    <Grid
      autoFlow="row"
      p={8}
      gap={5}
      background="bgSecondary"
      borderRadius="md"
      borderColor="borderSubtle"
      borderWidth="1px"
      zIndex={1}
    >
      <Flex justify="space-between" w="full" flex={1}>
        <HStack spacing={3}>
          <HStack align="center" spacing={3}>
            <Flex
              align="center"
              justify="center"
              borderRadius="full"
              borderColor="borderSubtle"
              overflow="hidden"
              borderWidth="1px"
              h={12}
              w={12}
            >
              <Image src={post.accountAvatarUrl ?? "#"} />
            </Flex>
            <VStack spacing={0} align="flex-start" justify="center">
              <HStack spacing={2}>
                <Text textStyle="heading-sm">{post.accountName}</Text>
              </HStack>
              <Text textStyle="text-sm" color="text.500">
                Posted{" "}
                {formatDistance(new Date(post.originalPostDate), new Date(), {
                  addSuffix: true,
                })}
              </Text>
            </VStack>
          </HStack>
        </HStack>
        <HStack align="center" spacing={1}>
          <VStack spacing={0} align="flex-start" textAlign="right">
            <Text
              fontSize="sm"
              fontWeight="medium"
              width="full"
              textAlign="right"
            >
              {label}
            </Text>
            {post.postUrl && (
              <Link
                fontSize="xs"
                href={post.postUrl}
                textAlign="right"
                color="text.500"
                width="100%"
              >
                Go to source
              </Link>
            )}
          </VStack>
          <Flex w={12} h={12} marginInlineEnd={2}>
            {component}
          </Flex>
        </HStack>
      </Flex>
      {post.body && <Text textStyle="text">{post.body}</Text>}
      <DiscoveredImageGrid images={post.images} />
      <HStack justify="flex-start">
        <ButtonGroup>
          <Button
            colorScheme="blue"
            borderWidth="1px"
            borderRadius="4"
            leftIcon={<RiCheckLine />}
          >
            <Text fontWeight="medium">Approve All</Text>
          </Button>
        </ButtonGroup>
      </HStack>
      <Flex>
        <Text textStyle="text-sm" color="text.500" fontWeight="medium">
          <Box as="b">Hint:</Box> This account normally posts about{" "}
          <Box as="span" fontWeight="bold" color="text.100">
            Dreamcatcher
          </Box>
        </Text>
      </Flex>
    </Grid>
  )
}
