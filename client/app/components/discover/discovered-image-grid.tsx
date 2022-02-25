import {
  DiscoveredPostProps,
  ImageVerdictVote,
  MAX_IMAGE_DISPLAY,
} from "~/components/discover/discovered-post"
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
  RiDownload2Line,
  RiFullscreenLine,
} from "react-icons/ri"
import { useMemo, useState } from "react"
import { Maybe, DiscoveredImageVerdict } from "~/__generated__/graphql"
import { Routing } from "~/client/routing"

enum Verdict {}

type Images = DiscoveredPostProps["post"]["images"]

type ImageType = Images[number]

export type DiscoveredImageProps = {
  image: ImageType
}

const hoverableButtonLike = {
  bg: "rgba(0, 0, 0, 0.4)",
  _hover: {
    bg: "rgba(0, 0, 0, 0.6)",
  },
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

const DiscoveredImage = ({ image }: DiscoveredImageProps) => {
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
      <ButtonGroup position="absolute" bottom={2} left={2}>
        <Button onClick={preview.onOpen} {...hoverableButtonLike}>
          <RiFullscreenLine />
        </Button>
        <Link
          href={Routing.toDiscoveredImageDownload(image.id)}
          {...hoverableButtonLike}
          target="_blank"
          display="flex"
          alignItems="center"
          borderRadius="md"
          px={4}
        >
          <RiDownload2Line />
        </Link>
      </ButtonGroup>
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

type ImageProps = {
  image: ImageType
  voteStatus?: ImageVerdictVote
  // actionKey: string
  vote: (v: Verdict, id: number, reason?: string) => Promise<unknown>
}

function ImageComponent({ image, vote, voteStatus }: ImageProps) {
  const voteProps = voteStatus ? { verdict: voteStatus.verdict } : undefined
  const imageMemo = useMemo(() => <DiscoveredImage image={image} />, [image.id])

  return (
    <VStack direction="column" spacing={2}>
      {imageMemo}
      <ButtonGroup bottom={0} zIndex={1} size="sm" w="full">
        {image.duplicateImage && (
          <Button
            w="full"
            bg={colorWhen(Verdict.Merge, "green.600", voteProps)}
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
          bg={colorWhen(Verdict.Approve, "cyan.600", voteProps)}
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
          bg={colorWhen(Verdict.Decline, "red.600", voteProps)}
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
  )
}

export type DiscoveredImageGridProps = {
  showingMore: boolean
  voteImage(verdict: string, imageId: number, reason?: string): Promise<unknown>
  images: Images
  verdicts: Record<string, ImageVerdictVote>
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
  verdicts,
  voteImage,
}: DiscoveredImageGridProps) {
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
        <ImageComponent
          image={image}
          vote={voteImage}
          voteStatus={verdicts[image.id]}
          key={image.id}
        />
      ))}
    </Grid>
  )
}
