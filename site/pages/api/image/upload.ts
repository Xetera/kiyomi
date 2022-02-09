import { handle, withFileUpload } from "@/lib/middleware"
import { Image, User } from "@prisma/client"
import { z } from "zod"
import { IreneBotUploadOptions, UploadError } from "@/lib/services/uploader"
import fetch from "node-fetch"
import { getUserFromToken } from "@/lib/auth"

export const config = {
  api: {
    bodyParser: false,
  },
}

const numeric = z.string().regex(/^\d+$/).transform(Number)
const boolic = z
  .string()
  .regex(/(true|false)/)
  .default("true")
  .transform((f) => f === "true")

const UploadSchema = z.object({
  public: boolic,
  // only available if no file
  url: z.string().nullish(),
  source: z.string().nullish(),
  ireneBotId: numeric.nullish(),
  ireneBotIdolId: numeric.nullish(),
  ireneBotIdolName: z.string().nullish(),
})

type UploadSchema = z.infer<typeof UploadSchema>

export default handle(
  withFileUpload(async (req, res, { upload, db: prisma }) => {
    const error = () => {
      return res.status(403).json({ error: "Forbidden" })
    }

    const contextType = "TOKEN"
    const auth = req.headers.authorization

    if (!auth) {
      return error()
    }

    let user = await getUserFromToken(auth, prisma)
    if (!user) {
      return error()
    }
    try {
      const { files, fields } = upload
      const [file] = files
      let uploadSchema: UploadSchema
      try {
        uploadSchema = await UploadSchema.parseAsync(fields)
      } catch (err) {
        return res.json(err)
      }
      let buffer: Buffer
      if (!file) {
        if (!uploadSchema.url) {
          return res
            .status(400)
            .json({ error: "Need either a file or a url parameter" })
        }
        try {
          buffer = await fetch(uploadSchema.url).then((res) => res.buffer())
        } catch (err) {
          console.error(err)
          res.json({ error: "Could not download target url" })
          return
        }
      } else {
        buffer = file.buffer
      }
      const irene: IreneBotUploadOptions | undefined =
        uploadSchema.ireneBotIdolId &&
        uploadSchema.ireneBotId &&
        uploadSchema.ireneBotIdolName
          ? {
              id: uploadSchema.ireneBotId,
              idolId: uploadSchema.ireneBotIdolId,
              idolName: uploadSchema.ireneBotIdolName,
            }
          : undefined

      const userObject = await prisma.user.findUnique({
        where: { id: user.id },
      })
      if (!userObject) {
        return res.json({ error: "Invalid user" })
      }

      let image: Image
      try {
        image = await req.services.uploader.uploadImage({
          irene,
          public: uploadSchema.public,
          fileName: file ? file.originalname : undefined,
          buffer,
          uploader: userObject,
          uploadType: contextType,
        })
      } catch (err) {
        console.log(err)
        if (err instanceof UploadError) {
          console.log("is upload error")
          res.status(err.status).json({ error: err.message })
          return
        } else if (err instanceof Error) {
          console.log("is not upload error")
          res.status(500).json({ error: "Internal server error" })
          return
        }
        res.status(500).json({ error: "wtf?" })
        return
      }

      return res.json(image)
    } catch (err) {
      console.log(err)
      res.status(500).json({ error: "Internal Server Error" })
    }
  })
)
