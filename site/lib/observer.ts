import { ImageReport, Image, Tag } from "@prisma/client"
import { bufferTime, Subject } from "rxjs"
import { UpdatePersonOptions } from "@/lib/services/person"

export const siteEvent = {
  image: {
    report$: new Subject<ImageReport>(),
    upload$: new Subject<Image>(),
  },
  person: {
    update$: new Subject<UpdatePersonOptions>(),
  },
}
