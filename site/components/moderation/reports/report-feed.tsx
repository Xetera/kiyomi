import {
  ImageReportAction,
  ImageReportsQuery,
  useImageReportActionMutation,
  useImageReportsQuery,
} from "@/lib/__generated__/graphql"
import { Text, VStack } from "@chakra-ui/react"
import { ImageReport } from "@/components/moderation/reports/image-report"
import { useList } from "react-use"
import useToast from "@/hooks/useToast"

const Reports = ({ data }: { data: ImageReportsQuery }) => {
  const toast = useToast()
  const [reports, { removeAt, insertAt }] = useList(data.imageReports)
  const { mutateAsync } = useImageReportActionMutation()

  async function doAction(
    report: ImageReportsQuery["imageReports"][number],
    action: ImageReportAction,
    i: number
  ) {
    // optimistic removal
    removeAt(i)
    await mutateAsync({
      id: report.id,
      action,
    }).catch((err) => {
      if (err instanceof Error) {
        toast({
          status: "error",
          description: err.message,
        })
      }
      insertAt(i, report)
    })
  }

  return (
    <VStack
      spacing={8}
      maxW="6xl"
      mx="auto"
      w="full"
      mt={6}
      px={4}
      overflow="hidden"
    >
      {reports.length === 0 && (
        <Text>
          No reports to see here, thanks for keeping the site clean
          :pleading_face:
        </Text>
      )}
      {reports.map((report, i) => (
        <ImageReport
          width={report.image.width}
          height={report.image.height}
          onAction={(action) => doAction(report, action, i)}
          reason={report.reason ?? undefined}
          reportedBy={report.reportedBy}
          reportedAt={new Date(report.createdAt)}
          src={report.image.thumbnail.medium}
          slug={report.image.slug}
          key={report.id}
        />
      ))}
    </VStack>
  )
}

export const ReportFeed = () => {
  const { data } = useImageReportsQuery()

  return data?.imageReports ? <Reports data={data} /> : null
}
