import { DiscoveredPostProps } from "@/components/discover/discovered-post"
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
    <Skeleton isLoaded={loaded} width="full" height="full">
      <Image
        src={image.url}
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
    <Flex position="relative" overflow="hidden" borderRadius="sm" w="full">
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
    return "500px"
  }
}

export function DiscoveredImageGrid({ images }: DiscoveredImageGridProps) {
  const imageCount = images.length
  return (
    <Grid
      gap={2}
      w="full"
      gridTemplateColumns={calculateGridColumns(imageCount)}
      gridTemplateRows={calculateGridRows(imageCount)}
      overflow="hidden"
    >
      {images.map((image) => (
        <VStack direction="column" spacing={2}>
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
                colorScheme="blue"
                w="full"
                borderRadius="4"
                flex="100%"
                leftIcon={<RiAddBoxFill />}
              >
                Merge
              </Button>
            )}
            <Button
              w="full"
              borderRadius="4"
              bg="inherit"
              borderColor="borderSubtle"
              borderWidth="1px"
              flex={image.duplicateImage ? "20%" : "100%"}
              leftIcon={!image.duplicateImage ? <RiCheckLine /> : undefined}
            >
              {!image.duplicateImage ? "Approve" : <RiCheckLine />}
            </Button>
            <Button
              w="full"
              borderRadius="4"
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
