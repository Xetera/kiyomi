import {
  RiAddBoxFill,
  RiCheckLine,
  RiPinterestLine,
  RiTwitterLine,
} from "react-icons/ri"
import {
  DiscoveredPostsQuery,
  Maybe,
  useVoteDiscoveryImageMutation,
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
  VStack,
} from "@chakra-ui/react"
import { Flex, Text } from "@chakra-ui/layout"
import formatDistance from "date-fns/formatDistance"
import { DiscoveredImageGrid } from "./discovered-image-grid"
import { useState } from "react"
import { Verdict } from "@/lib/shared"
import keyBy from "lodash/keyBy"
import mapValues from "lodash/mapValues"
import { DiscoveredImageVote } from "@prisma/client"
import useToast from "@/hooks/useToast"

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
    case "twitter.timeline":
    case "TwitterTimeline":
      return { component: <RiTwitterLine size={24} />, label: "Twitter" }
    default:
      return { label: "Unknown", component: <Text>?</Text> }
    case "UnitedCubeArtistFeed":
    case "united_cube.artist_feed":
      return {
        component: <Image src="/provider-icons/united-cube.png" w={8} h={8} />,
        label: "UCube",
      }
    case "pinterest.board_feed":
      return {
        component: <RiPinterestLine size={24} />,
        label: "Pinterest",
      }
  }
}

type DerivedPost = DiscoveredPostsQuery["discoveryFeed"][number]

export type DiscoveredPostProps = {
  post: DerivedPost
}
type PostBodyProps = { text: string; providerType: string }

function PostBody({ text, providerType }: PostBodyProps) {
  // UCube returns html for some reason
  if (providerType === "UnitedCubeArtistFeed") {
    return (
      <Text
        textStyle="text"
        className="post-body--ucube"
        dangerouslySetInnerHTML={{ __html: text }}
      />
    )
  }
  return <Text textStyle="text">{text}</Text>
}

export const MAX_IMAGE_DISPLAY = 4

export type ImageVerdictVote = Maybe<Pick<DiscoveredImageVote, "verdict">>

export type ImageVerdict = {
  id: number
  vote?: ImageVerdictVote
}

export function DiscoveredPost({ post }: DiscoveredPostProps) {
  const [showingAll, showMore] = useState(
    post.images.length < MAX_IMAGE_DISPLAY
  )

  function toVerdicts(images: ImageVerdict[]) {
    return mapValues(
      keyBy(
        images.filter((image) => image.vote),
        (e) => e.id
      ),
      (a) => a.vote
    ) as Record<string, ImageVerdictVote>
  }

  const [verdicts, setVerdicts] = useState(() => toVerdicts(post.images))
  const { component, label } = decideProvider(post.providerType)
  const { mutateAsync: runVotePost } = useVoteDiscoveryPostMutation()
  const { mutateAsync: runVoteImage } = useVoteDiscoveryImageMutation()
  const toast = useToast("error")

  async function votePost(verdict: Verdict, reason?: string) {
    const result = await runVotePost({
      postId: post.id,
      reason,
      verdict,
    })
    setVerdicts((prev) => ({
      ...prev,
      ...toVerdicts(result.discoveredPostVote),
    }))
  }

  async function voteImage(verdict: string, imageId: number, reason?: string) {
    try {
      setVerdicts((prev) => ({
        ...prev,
        [imageId]: { verdict },
      }))
      await runVoteImage({ imageId, reason, verdict })
    } catch (err) {
      if (err instanceof Error) {
        toast({
          title: "Error voting",
          description: err.message,
        })
      }
      setVerdicts(verdicts)
    }
  }

  const hasImageNeedsMerging = Object.values(post.images).some(
    (e) => e.duplicateImage
  )

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
      data-provider-type={post.providerType}
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
              {post.accountAvatarUrl && <Image src={post.accountAvatarUrl} />}
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
          <Flex
            w={12}
            h={12}
            marginInlineEnd={2}
            align="center"
            justify="center"
          >
            {component}
          </Flex>
        </HStack>
      </Flex>
      {post.body && (
        <PostBody text={post.body} providerType={post.providerType} />
      )}
      <DiscoveredImageGrid
        images={post.images}
        showingMore={showingAll}
        verdicts={verdicts}
        voteImage={voteImage}
      />
      {!showingAll && (
        <Button
          bg="bgPrimary"
          borderColor="borderSubtle"
          borderWidth="1px"
          onClick={() => showMore(true)}
        >
          Show {post.images.length - MAX_IMAGE_DISPLAY} more images
        </Button>
      )}
      {/* show approve all only if all images are visible */}
      {showingAll && (
        <HStack justify="flex-start">
          <ButtonGroup spacing={3} size="sm">
            {hasImageNeedsMerging && (
              <Button
                borderWidth="1px"
                bg="inherit"
                borderRadius="4"
                borderColor="lightTransparent"
                _hover={{
                  bg: "green.600",
                }}
                leftIcon={<RiAddBoxFill />}
                onClick={() => votePost(Verdict.Merge)}
              >
                <Text fontWeight="medium">Merge All Pending</Text>
              </Button>
            )}
            <Button
              borderWidth="1px"
              bg="inherit"
              borderRadius="4"
              borderColor="lightTransparent"
              _hover={{
                bg: "cyan.600",
              }}
              leftIcon={<RiCheckLine />}
              onClick={() => votePost(Verdict.Approve)}
            >
              <Text fontWeight="medium">Approve All</Text>
            </Button>
          </ButtonGroup>
        </HStack>
      )}
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
