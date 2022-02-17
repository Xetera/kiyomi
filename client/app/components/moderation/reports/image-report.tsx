import {
  AspectRatio,
  Button,
  Flex,
  forwardRef,
  Image,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react"
import { ImageReportAction, Maybe } from "~/__generated__/graphql"
import NextLink from "next/link"
import { Routing } from "~/client/routing"
import formatDistance from "date-fns/formatDistance"

export type ImageReportProps = {
  width: number
  height: number
  reason?: string
  src: string
  slug: string
  reportedAt: Date
  onAction(action: ImageReportAction): void
  reportedBy?: {
    name?: Maybe<string>
  }
}

const B = forwardRef(({ children, ...rest }, ref) => (
  <Button mb={2} mr={2} {...rest} ref={ref} size="sm">
    {children}
  </Button>
))

export const ImageReport = (report: ImageReportProps) => {
  return (
    <VStack
      bg="rgba(0, 0, 0, 0.2)"
      borderRadius="md"
      alignItems="center"
      overflow="hidden"
      w="full"
      maxW="500px"
      spacing={0}
    >
      <Flex justify="space-between" w="full" align="flex-start" p={4}>
        <VStack w="full" align="flex-start" spacing={1}>
          <Text textStyle="heading-sm">
            {report.reportedBy?.name ?? "Unknown User"}
          </Text>
          {report.reason && <Text>{report.reason}</Text>}
        </VStack>
        <Text
          textStyle="text"
          whiteSpace="nowrap"
          alignSelf="flex-start"
          color="gray.300"
        >
          Reported{" "}
          {formatDistance(report.reportedAt, new Date(), {
            addSuffix: true,
          })}
        </Text>
      </Flex>
      <AspectRatio ratio={report.width / report.height} h="full" w="full">
        <NextLink href={Routing.toImage(report.slug)} passHref>
          <Link target="_blank">
            <Image
              maxW="full"
              src={report.src}
              w="full"
              alignSelf="flex-start"
            />
          </Link>
        </NextLink>
      </AspectRatio>
      <Flex flexFlow="row wrap" p={4} alignSelf="flex-start" mb={-2}>
        <B onClick={() => report.onAction(ImageReportAction.Dismiss)}>
          Dismiss
        </B>
        <B onClick={() => report.onAction(ImageReportAction.HideImage)}>
          Hide Image
        </B>
        <B disabled>Delete Image</B>
        <B onClick={() => report.onAction(ImageReportAction.RestrictUser)}>
          Restrict User
        </B>
      </Flex>
    </VStack>
  )
}
