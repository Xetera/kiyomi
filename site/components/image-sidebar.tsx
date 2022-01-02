import { humanFileSize } from "@/lib/shared"
import React from "react"
import { Palette } from "./palette-color"
import { Tags } from "./tags"
import { CascadeChildren } from "./animations/cascade-children"
import {
  RiHeartFill,
  RiQuestionLine,
  RiScan2Line,
  RiUser3Fill,
} from "react-icons/ri"
import { format } from "date-fns"
import { User } from "./user"
import { ImageContext } from "@/models/contexts"
import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/layout"
import { Grid, Tooltip, useToast, UseToastOptions } from "@chakra-ui/react"
import { useSession } from "next-auth/client"
import { useToggleLikeMutation } from "@/lib/__generated__/graphql"
import useQueue from "./queue-button"
import { useRouter } from "next/router"
import { useQueryClient } from "react-query"

function SidebarSection({ title, children }) {
  return (
    <>
      <Heading
        fontSize="sm"
        whiteSpace="nowrap"
        display="flex"
        flexFlow="row nowrap"
        alignItems="center"
        mr="2"
      >
        {title}
      </Heading>
      <Text size="sm">{children}</Text>
    </>
  )
}

export type ImageSidebarProps = {
  onEdit: () => void
}

type TagProps = {}

function Tag({ text, icon, onClick, disabled = false }) {
  const data = (
    <Flex
      alignItems="center"
      pr={4}
      pb={2}
      cursor="pointer"
      onClick={onClick}
      fontSize={["sm", null, null, "md"]}
      color={disabled ? "trueGray.600" : "trueGray.300"}
    >
      <Box mr={2}>{icon}</Box>
      <Text fontWeight="600">{text}</Text>
    </Flex>
  )
  if (disabled) {
    return <Tooltip label="Already requested">{data}</Tooltip>
  }
  return data
}

export default function ImageSidebar({ onEdit }: ImageSidebarProps) {
  const toast = useToast()
  const image = React.useContext(ImageContext)
  const router = useRouter()
  const { data, mutate } = useToggleLikeMutation()
  if (!image) {
    return null
  }
  function toggleLike() {
    if (!image) {
      return
    }
    const toastProps: UseToastOptions = {
      variant: "solid",
      position: "bottom-right",
    }
    if (liked) {
      toast({
        ...toastProps,
        status: "info",
        title: "You unliked this image",
      })
    } else {
      toast({
        ...toastProps,
        status: "success",
        title: "You liked this image",
      })
    }
    mutate({ id: image.id })
  }
  const client = useQueryClient()
  const liked = data?.toggleLike.liked ?? image.liked
  const uploadDate = new Date(image.createdAt)
  const slug = router.query.slug as string
  const reScan = useQueue({ slug })
  return (
    <Stack
      alignItems="flex-start"
      fontSize="sm"
      borderRadius="md"
      maxWidth="600px"
      mx="auto"
    >
      <CascadeChildren className="grid gap-4 text-sm">
        <Flex>
          <Tag icon={<RiHeartFill />} text="Like" onClick={toggleLike} />
          <Tag icon={<RiUser3Fill />} text="Edit Faces" onClick={onEdit} />
          <Tag icon={<RiScan2Line />} text="Re-scan Image" onClick={reScan} />
        </Flex>
        <Flex flexDirection="row" alignItems="top">
          <User
            // @ts-ignore
            user={image.uploadedBy}
            bottom={
              <Box
                as="time"
                color="gray.300"
                dateTime={image.createdAt.toString()}
              >
                {format(uploadDate, "MMMM dd, yyyy HH:mm")}
              </Box>
            }
          />
        </Flex>
        <hr className="border-theme-subtle" />
        <Grid
          gap={2}
          className="grid gap-2"
          color="gray.300"
          gridTemplateColumns="min-content 1fr"
        >
          <SidebarSection title={"Dimensions"}>
            <p className="font-semibold">
              {image.width}x{image.height}
            </p>
          </SidebarSection>
          <SidebarSection title={"Size"}>
            <p className="font-semibold">{humanFileSize(image.bytes)}</p>
          </SidebarSection>
          <SidebarSection title={"Type"}>
            <p className="font-semibold">{image.mimetype.toUpperCase()}</p>
          </SidebarSection>
          <SidebarSection
            title={
              <>
                Scan Date
                <div data-tip="Last date this image was scanned for faces">
                  <RiQuestionLine className="ml-2" />
                </div>
              </>
            }
          >
            <p className="font-semibold">
              {image.faceScanDate
                ? format(new Date(image.faceScanDate), "MMMM dd, yyyy")
                : "Never"}
            </p>
          </SidebarSection>
        </Grid>
        {image.imageTags?.length > 0 ? (
          <Tags tags={image.imageTags.map(({ tag }) => tag.name)} />
        ) : (
          <div />
        )}
        <Palette colors={image.palette} />
        {/* {image.tags?.length > 0 ? (
          <Tags tags={image.tags.map((tag) => tag.name)} />
        ) : (
          <div />
        )}
        <div>
          {image.source && <p className="text-gray-500">{image.source}</p>}
        </div>
        <Box>
          <Button
            background={liked ? "rose.500" : "trueGray.400"}
            color="white"
            size="sm"
            _hover={{
              background: "rose.400",
            }}
            onClick={toggleLike}
          >
            {isLoading ? <Spinner size="sm" /> : <RiHeartAddFill />}
          </Button>
        </Box>
        <Heading as="h2" size="sm" color="trueGray.300">
          Admin Controls
        </Heading>
        <Grid gap={2}>
          <Button
            onClick={onEdit}
            size="sm"
            leftIcon={<RiUser3Fill />}
            width="100%"
          >
            Edit Faces
          </Button>
          <QueueButton slug={image.slug} scanDate={image.faceScanDate} />
        </Grid> */}
      </CascadeChildren>
    </Stack>
  )
}
