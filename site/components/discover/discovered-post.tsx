import { RiCheckLine, RiPinterestLine, RiTwitterLine } from "react-icons/ri"
import {
  DiscoveredPostsQuery,
  useVoteDiscoveryPostMutation,
} from "@/lib/__generated__/graphql"
import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  HStack,
  Image,
  Link,
  Stack,
  VStack,
} from "@chakra-ui/react"
import { Flex, Text } from "@chakra-ui/layout"
import formatDistance from "date-fns/formatDistance"
import { DiscoveredImageGrid } from "./discovered-image-grid"

export type ProviderIconProps = {
  providerType: string
}

export function decideProvider(
  providerType: string
): { component?: React.ReactElement; label: string } {
  switch (providerType) {
    case "weverse.artist_feed":
    case "WeverseArtistFeed":
      return {
        component: (
          <Image src="/provider-icons/weverse.svg" alt="Weverse App" />
        ),
        label: "Weverse",
      }
    case "twitter.feed":
    case "TwitterFeed":
      return { component: <RiTwitterLine size={24} />, label: "Twitter" }
    default:
      return { label: "Unknown", component: <Text>?</Text> }
    case "united_cube.artist_feed":
      return {
        component: <Image src="/provider-icons/united-cube.png" />,
        label: "UCube",
      }
    case "pinterest.board_feed":
      return {
        component: <RiPinterestLine size={24} />,
        label: "Pinterest",
      }
  }
}

export type DiscoveredPostProps = {
  post: DiscoveredPostsQuery["discoveryFeed"][number]
}

export function DiscoveredPost({ post }: DiscoveredPostProps) {
  const { component, label } = decideProvider(post.providerType)
  const { mutateAsync } = useVoteDiscoveryPostMutation()
  async function votePost(verdict: string, reason?: string) {
    const result = await mutateAsync({
      postId: post.id,
      reason,
      verdict,
    })
    console.log({ result })
  }
  return (
    <Grid
      autoFlow="row"
      p={8}
      gap={5}
      background="rgba(0, 0, 0, 0.1)"
      backdropFilter="blur(15px)"
      borderRadius="md"
      borderColor="borderSubtle"
      borderWidth="1px"
      zIndex={1}
    >
      <Flex
        justify="space-between"
        direction={["column", null, "row"]}
        w="full"
        sx={{ gap: 4 }}
        flex={1}
      >
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
        <HStack align="center" spacing={1} justify="flex-end">
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
            borderWidth="1px"
            bg="inherit"
            borderRadius="4"
            borderColor="lightTransparent"
            _hover={{
              bg: "cyan.600",
            }}
            leftIcon={<RiCheckLine />}
            onClick={() => votePost("approve")}
          >
            <Text fontWeight="medium">Approve All</Text>
          </Button>
        </ButtonGroup>
      </HStack>
      <Flex>
        <Text textStyle="text-sm" color="text.500" fontWeight="medium">
          <Box as="b">Note:</Box> This account normally posts about{" "}
          <Box as="span" fontWeight="bold" color="text.100">
            Dreamcatcher
          </Box>
        </Text>
      </Flex>
    </Grid>
  )
}
