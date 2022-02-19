import React, { ReactNode, useContext, useState } from "react"
import { Palette } from "../palette-color"
import { Tags } from "../tags"
import {
  RiAlarmWarningLine,
  RiHeartFill,
  RiQuestionLine,
  RiScan2Line,
  RiUser3Fill,
} from "react-icons/ri"
import { format } from "date-fns"
import { User } from "../user"
import { GraphqlClientContext, ImageContext } from "~/models/contexts"
import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/layout"
import {
  Button,
  Grid,
  Tooltip,
  useToast,
  UseToastOptions,
} from "@chakra-ui/react"
import useQueue from "../queue-button"
import { ReportModal } from "~/components/data-entry/report-modal"
import { useParams } from "remix"

const SidebarSection: React.FC<{ title: ReactNode }> = ({
  title,
  children,
}) => {
  return (
    <>
      <Heading
        fontSize="sm"
        whiteSpace="nowrap"
        display="flex"
        fontWeight="semibold"
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
  const sdk = useContext(GraphqlClientContext)
  const toast = useToast()
  const image = useContext(ImageContext)
  const params = useParams()
  const [liked, setLiked] = useState(image?.liked ?? false)
  const [reportOpen, setReportOpen] = useState(false)
  if (!image) {
    return null
  }

  async function toggleLike() {
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

    const result = await sdk.ToggleLike({ id: image.id })
    setLiked(result.toggleLike.liked ?? false)
  }

  const uploadDate = new Date(image.createdAt)
  const slug = params.slug as string
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
      <Grid gap={6}>
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
        <Box as="hr" borderColor="borderSuble" />
        <Grid gap={2} color="gray.300" gridTemplateColumns="min-content 1fr">
          <SidebarSection title={"Dimensions"}>
            {image.width}x{image.height}
          </SidebarSection>
          <SidebarSection title={"Size"}>{image.bytes}</SidebarSection>
          <SidebarSection title={"Type"}>
            {image.mimetype.toUpperCase()}
          </SidebarSection>
          <SidebarSection
            title={
              <>
                Scan Date
                <Box
                  ml={2}
                  data-tip="Last date this image was scanned for faces"
                >
                  <RiQuestionLine />
                </Box>
              </>
            }
          >
            {image.faceScanDate
              ? format(new Date(image.faceScanDate), "MMMM dd, yyyy")
              : "Never"}
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
      </Grid>
    </Stack>
  )
}
