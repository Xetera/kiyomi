import {
  DiscoveredPostProps,
  MAX_IMAGE_DISPLAY,
} from "@/components/discover/discovered-post"
import {
  Button,
  ButtonGroup,
  Grid,
  Image,
  Link,
  Modal,
  ModalContent,
  ModalOverlay,
  Skeleton,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react"
import { Flex } from "@chakra-ui/layout"
import {
  RiAddBoxFill,
  RiCheckLine,
  RiCloseLine,
  RiDeleteBinLine,
  RiFullscreenLine,
} from "react-icons/ri"
import NextLink from "next/link"
import { useState } from "react"
import { Verdict } from "@/lib/shared"
import {
  Maybe,
  useVoteDiscoveryImageMutation,
} from "@/lib/__generated__/graphql"

type Images = DiscoveredPostProps["post"]["images"]

export type DiscoveredImageProps = {
  image: Images[number]
}

function DiscoverImageLoader({
  image,
  isDuplicate,
}: DiscoveredImageProps & { isDuplicate: boolean }) {
  const [loaded, setLoaded] = useState(false)
  return (
    <Skeleton isLoaded={loaded} h="full" w="full">
      <Image
        src={image.thumbnail}
        minH="full"
        w="full"
        borderRadius="sm"
        objectFit="cover"
        onLoad={(_) => setLoaded(true)}
        opacity={isDuplicate ? "20%" : "100%"}
      />
    </Skeleton>
  )
}

function DiscoveredImage({ image }: DiscoveredImageProps) {
  const isDuplicate = Boolean(image.duplicateImage)
  const preview = useDisclosure()
  return (
    <Flex
      position="relative"
      overflow="hidden"
      borderRadius="sm"
      w="full"
      h="full"
    >
      <DiscoverImageLoader image={image} isDuplicate={isDuplicate} />
      {isDuplicate && (
        <Text
          bg="rgba(0, 0, 0, 0.5)"
          position="absolute"
          left={0}
          right={0}
          top={0}
          p={2}
          textAlign="center"
          mx="auto"
          textStyle="text-sm"
          fontWeight="medium"
          color="text.400"
        >
          This image is very likely a duplicate of{" "}
          <NextLink href={image.duplicateImage!.url} passHref>
            <Link color="brand.100" target="_blank">
              an existing image
            </Link>
          </NextLink>
        </Text>
      )}
      <Button position="absolute" bottom={2} left={2} onClick={preview.onOpen}>
        <RiFullscreenLine />
      </Button>
      <Modal isOpen={preview.isOpen} onClose={preview.onClose}>
        <ModalOverlay />
        <ModalContent position="relative">
          <Button
            mr={3}
            onClick={preview.onClose}
            position="absolute"
            top={2}
            right={1}
            autoFocus={false}
          >
            <RiCloseLine />
          </Button>
          {!image.duplicateImage ? (
            <Image src={image.url} />
          ) : (
            <Flex w="full" direction="column">
              <Image src={image.url} />
              <Image src={image.duplicateImage!.rawUrl} />
            </Flex>
          )}
          {/*<ModalFooter>*/}
          {/*  <Button variant="ghost">Secondary Action</Button>*/}
          {/*</ModalFooter>*/}
        </ModalContent>
      </Modal>
    </Flex>
  )
}

export type DiscoveredImageGridProps = {
  showingMore: boolean
  images: Images
}

function calculateGridColumns(count: number) {
  if (count > 1) {
    return ["1fr", null, "1fr 1fr"]
  } else {
    return ["1fr"]
  }
}

function calculateGridRows(count: number) {
  if (count > 2) {
    return "350px 350px"
  } else {
    return "600px"
  }
}

function colorWhen(
  v: Verdict,
  color: string,
  a?: Maybe<{ verdict?: Maybe<string> }>
): string {
  return a && a.verdict === v ? color : "inherit"
}

export function DiscoveredImageGrid({
  images,
  showingMore,
}: DiscoveredImageGridProps) {
  const { mutateAsync } = useVoteDiscoveryImageMutation()
  function vote(verdict: string, imageId: number, reason?: string) {
    mutateAsync({ verdict, reason, imageId: imageId })
  }
  const imageCount = images.length
  const imageToMap = showingMore ? images : images.slice(0, MAX_IMAGE_DISPLAY)
  return (
    <Grid
      gap={2}
      w="full"
      gridTemplateColumns={calculateGridColumns(imageCount)}
      gridTemplateRows={calculateGridRows(imageCount)}
      overflow="hidden"
    >
      {imageToMap.map((image) => (
        <VStack direction="column" spacing={2} key={image.id}>
          <DiscoveredImage image={image} />
          <ButtonGroup
            bottom={0}
            // right={0}
            zIndex={1}
            // m={2}
            size="sm"
            w="full"
          >
            {image.duplicateImage && (
              <Button
                w="full"
                bg={colorWhen(Verdict.Merge, "green.600", image.vote)}
                borderColor="lightTransparent"
                borderWidth="1px"
                borderRadius="4"
                flex="100%"
                onClick={() => vote(Verdict.Merge, image.id)}
                _hover={{
                  bg: "green.600",
                }}
                leftIcon={<RiAddBoxFill />}
              >
                Merge
              </Button>
            )}
            <Button
              w="full"
              borderRadius="4"
              bg={colorWhen(Verdict.Approve, "cyan.600", image.vote)}
              borderColor="lightTransparent"
              borderWidth="1px"
              onClick={() => vote(Verdict.Approve, image.id)}
              _hover={{
                bg: "cyan.600",
              }}
              flex={image.duplicateImage ? "20%" : "100%"}
              leftIcon={!image.duplicateImage ? <RiCheckLine /> : undefined}
            >
              {!image.duplicateImage ? "Approve" : <RiCheckLine />}
            </Button>
            <Button
              w="full"
              borderRadius="4"
              bg={colorWhen(Verdict.Decline, "red.600", image.vote)}
              borderColor="lightTransparent"
              borderWidth="1px"
              _hover={{
                bg: "red.600",
              }}
              onClick={() => vote(Verdict.Decline, image.id)}
              flex={image.duplicateImage ? "20%" : "100%"}
              leftIcon={!image.duplicateImage ? <RiDeleteBinLine /> : undefined}
            >
              {!image.duplicateImage ? "Decline" : <RiDeleteBinLine />}
            </Button>
          </ButtonGroup>
        </VStack>
      ))}
    </Grid>
  )
}
