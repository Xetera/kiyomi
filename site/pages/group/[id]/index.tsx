import { GroupPage } from "@/components/group/group-page"
import { getServerSidePropsGroupsPage } from "@/lib/ssr/group-page"

export type GroupPageProps = {
  id: number
}

export default GroupPage
