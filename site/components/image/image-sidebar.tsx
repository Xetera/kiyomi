import { humanFileSize } from "@/lib/shared"
import React, { useState } from "react"
import { Palette } from "../palette-color"
import { Tags } from "../tags"
import { CascadeChildren } from "../animations/cascade-children"
import {
  RiAlarmWarningLine,
  RiHeartFill,
  RiKnifeBloodLine,
  RiQuestionLine,
  RiScan2Line,
  RiUser3Fill,
} from "react-icons/ri"
import { format } from "date-fns"
import { User } from "../user"
import { ImageContext } from "@/models/contexts"
import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/layout"
import {
  Button,
  Grid,
  Tooltip,
  useToast,
  UseToastOptions,
} from "@chakra-ui/react"
import { useSession } from "next-auth/client"
import {
  useToggleLikeMutation,
  useReportImageMutation,
} from "@/lib/__generated__/graphql"
import useQueue from "../queue-button"
import { useRouter } from "next/router"
import { useQueryClient } from "react-query"
import { ReportModal } from "@/components/data-entry/report-modal"

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

type TagProps = {
  text: string
  icon: React.ReactNode
  onClick(): void
  tooltip?: string
  disabled?: boolean
}

export function InteractableButton({
  text,
  icon,
  onClick,
  tooltip,
  disabled = false,
}: TagProps) {
  const data = (
    <Button
      alignItems="center"
      px={4}
      py={2}
      mr={4}
      mb={2}
      disabled={disabled}
      borderRadius="md"
      overflow="hidden"
      onClick={onClick}
      bg="hsla(222, 20%, 10%, 1)"
      _hover={{
        bg: "hsla(222, 20%, 15%, 1)",
      }}
      fontSize={["sm", null, null, "md"]}
    >
      <Box mr={2}>{icon}</Box>
      <Text textStyle="heading-sm">{text}</Text>
    </Button>
  )
  if (disabled && tooltip) {
    return (
      <Tooltip label={tooltip} shouldWrapChildren>
        {data}
      </Tooltip>
    )
  }
  return data
}

export default function ImageSidebar({ onEdit }: ImageSidebarProps) {
  const toast = useToast()
  const image = React.useContext(ImageContext)
  const router = useRouter()
  const { data, mutate } = useToggleLikeMutation()
  const [reportOpen, setReportOpen] = useState(false)
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
      w="full"
      mx="auto"
    >
      <ReportModal
        id={image.id}
        slug={image.slug}
        src={image.rawUrl}
        isOpen={reportOpen}
        onClose={() => setReportOpen(false)}
      />
      <CascadeChildren className="grid gap-4 text-sm">
        <Flex flexFlow="row wrap">
          <InteractableButton
            icon={<RiHeartFill />}
            text="Like"
            onClick={toggleLike}
          />
          <InteractableButton
            icon={<RiUser3Fill />}
            text="Edit Faces"
            onClick={onEdit}
          />
          <InteractableButton
            icon={<RiScan2Line />}
            text="Scan-image"
            onClick={reScan}
          />
          <InteractableButton
            icon={<RiAlarmWarningLine />}
            disabled={image.reported}
            tooltip="You already reported this image"
            text="Report"
            onClick={() => setReportOpen(true)}
          />
        </Flex>
        <Flex flexDirection="row" alignItems="top">
          <User
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