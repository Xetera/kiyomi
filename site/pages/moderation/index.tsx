import { ReportFeed } from "@/components/moderation/reports/report-feed"
import { WithNavbar } from "@/components/navbar"
import { LinkedTabs } from "@/components/linked-tabs"
import { ModerationTabs } from "@/components/moderation/moderation-tabs"

const ModeratePage = () => {
  return (
    <WithNavbar>
      <ModerationTabs>
        <ReportFeed />
      </ModerationTabs>
    </WithNavbar>
  )
}

export default ModeratePage
