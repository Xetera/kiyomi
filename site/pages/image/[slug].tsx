import React, { useRef } from "react"
import ImageDisplay from "@/components/image-display"
import ImageSidebar from "@/components/image/image-sidebar"
import { FaceContext, ImageContext } from "@/models/contexts"
import { WithNavbar } from "@/components/navbar"
import NextHead from "next/head"
import { RiAlarmWarningLine, RiSpyLine } from "react-icons/ri"
import { useRouter } from "next/router"
import { useOneImageQuery } from "@/lib/__generated__/graphql"
import { prefetchQuery } from "@/lib/client-helpers"
import { wrapRequest } from "@/lib/data-fetching"
import { Flex, Heading, Text } from "@chakra-ui/layout"
import format from "date-fns/format"
import {
  ContextSidebar,
  SidebarItem,
  WithSidebar,
} from "@/components/context-sidebar"
import {
  Box,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react"
import { FaceAppearance } from "@/components/face-appearance"
import { GraphDisplay } from "@/components/graph-display"
import { ImageEditContainer } from "@/components/data-entry/image-edit/image-edit-container"

const Image = () => {
  const [isEditOpen, setEditOpen] = React.useState(false)
  const router = useRouter()
  const slug = router.query.slug as string
  const [face, setFace] = React.useState("")
  // best approximation for width
  const [containerWidth, setContainerWidth] = React.useState(600)
  const containerRef = useRef<HTMLDivElement>(null)
  const { data, refetch } = useOneImageQuery({ slug })

  function closeModal() {
    refetch()
    setEditOpen(false)
  }

  React.useEffect(() => {
    const { classList } = document.querySelector("body")!
    if (isEditOpen) {
      classList.add("overflow-hidden")
    } else {
      classList.remove("overflow-hidden")
    }
  }, [isEditOpen])

  React.useEffect(() => {
    const dimensions = containerRef.current?.getBoundingClientRect()
    if (dimensions) {
      setContainerWidth(dimensions.width)
    }
  }, [])
  const personIds = React.useMemo(
    () => data?.image?.appearances.map((r) => r.person.id) ?? [],
    [data]
  )

  if (!data) {
    return null
  }

  const { image } = data
  if (!image) {
    return (
      <WithNavbar>
        <Flex w="full" align="center" justify="center" h="full" flex="1">
          <Text textStyle="heading-sm">This image doesn't exist :(</Text>
        </Flex>
      </WithNavbar>
    )
  }

  return (
    <FaceContext.Provider value={{ face, setFace }}>
      <NextHead>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@_Xetera" />
        <meta property="twitter:image" content={image.rawUrl} />
      </NextHead>

      <ImageContext.Provider value={image}>
        <WithNavbar>
          <WithSidebar
            sidebar={
              (image.appearances.length > 0 ||
                image.unknownFaces.length > 0) && (
                <ContextSidebar
                  items={[
                    <SidebarItem title="In this Image">
                      {image.appearances.map((app) => (
                        <FaceAppearance
                          appearance={{
                            ...app,
                            face: app.faces[0],
                          }}
                          image={image}
                          key={app.id}
                        />
                      ))}
                      {image.unknownFaces.map((face) => (
                        <FaceAppearance
                          appearance={{
                            face: face,
                          }}
                          key={face.id}
                          image={image}
                        />
                      ))}
                    </SidebarItem>,
                  ]}
                />
              )
            }
          >
            <Flex direction="row" flex={1}>
              <Box flex={1}>
                {image.hiddenAt && (
                  <Box mx="auto">
                    <Flex
                      alignItems="center"
                      justifyContent="center"
                      mx="auto"
                      py={2}
                      bg="blue.800"
                      color="gray.200"
                      maxW="full"
                      fontSize={["sm", null, null, "md"]}
                    >
                      <Box display={{ base: "none", lg: "block" }} mr={2}>
                        <RiAlarmWarningLine />
                      </Box>
                      <Text textAlign="center">
                        This image was hidden on{" "}
                        <Box
                          as="span"
                          color="gray.300"
                          px={2}
                          py={1}
                          fontWeight="medium"
                          borderRadius="md"
                          bg="rgba(0, 0, 0, 0.3)"
                        >
                          {format(new Date(image.hiddenAt), "MMMM dd, yyyy")}
                        </Box>{" "}
                        but you can see it because you're a moderator.
                      </Text>
                    </Flex>
                  </Box>
                )}
                {!image.public && (
                  <Box mx="auto">
                    <Flex
                      fontWeight="semibold"
                      alignItems="center"
                      justifyContent="center"
                      mx="auto"
                      className="max-w-7xl py-3 px-4"
                    >
                      <RiSpyLine className="mr-2" />
                      <Text textAlign="center">
                        This image is unlisted and can only be viewed with a
                        link.
                      </Text>
                    </Flex>
                  </Box>
                )}
                <div className="w-full relative overflow-hidden">
                  <div className="justify-center mx-auto max-w-7xl px-4 lg:mb-12 mb-4">
                    <article
                      className="flex gap-8 justify-center flex-col"
                      ref={containerRef}
                    >
                      <Flex mt={[4, null, 6]} mb={[0, null, 6]}>
                        {image.caption && (
                          <h1 className="text-2xl font-black mb-2 text-blueGray-500">
                            {image.caption}
                          </h1>
                        )}
                        <ImageDisplay />
                      </Flex>
                      <ImageSidebar onEdit={() => setEditOpen(true)} />
                      <Flex maxWidth="600px" mx="auto" width="100%">
                        <Heading fontSize="sm">Image Graph</Heading>
                      </Flex>
                      <GraphDisplay
                        slug={slug}
                        width={containerWidth}
                        currentPersonIds={personIds}
                      />
                    </article>
                  </div>
                </div>
              </Box>
            </Flex>
          </WithSidebar>
          <Modal
            isOpen={isEditOpen}
            closeOnEsc
            closeOnOverlayClick
            onClose={closeModal}
          >
            <ModalOverlay />
            <ModalContent maxW="8xl" bg="inherit" boxShadow="none" minH="80vh">
              <ModalBody>
                <ImageEditContainer />
              </ModalBody>
            </ModalContent>
          </Modal>
        </WithNavbar>
      </ImageContext.Provider>
    </FaceContext.Provider>
  )
}

export const getServerSideProps = wrapRequest(async (ctx) => {
  const slug = ctx.params!.slug as string
  ctx.req.prisma.image
    .update({
      where: { slug },
      data: {
        views: {
          increment: 1,
        },
      },
    })
    .catch(console.error)
  const dehydratedState = await ctx.prefetch("OneImage", { slug })
  return {
    props: {
      slug,
      dehydratedState,
    },
  }
})

export default Image
