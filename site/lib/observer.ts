import { Image, ImageReport, UserRestriction } from "@prisma/client"
import { Subject } from "rxjs"
import { UpdatePersonOptions } from "@/lib/services/person"
import { ImageReportActionOptions } from "@/lib/services/report"
import { RestrictUserOptions } from "@/lib/services/ban"

export const siteEvent = {
  image: {
    report$: new Subject<ImageReport>(),
    reportAction$: new Subject<ImageReportActionOptions>(),
    upload$: new Subject<Image>(),
  },
  person: {
    update$: new Subject<UpdatePersonOptions>(),
  },
  user: {
    restrict$: new Subject<{
      restriction: UserRestriction
      event: RestrictUserOptions
    }>(),
  },
}
