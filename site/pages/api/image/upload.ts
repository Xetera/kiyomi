import { handle, withFileUpload, withUser } from "@/lib/middleware"
import { Image } from "@prisma/client"
import { z } from "zod"
import { IreneBotUploadOptions, UploadError } from "@/lib/services/uploader"
import fetch from "node-fetch"

export const config = {
  api: {
    bodyParser: false,
  },
}

const UploadSchema = z.object({
  public: z.boolean().default(false),
  // only available if no file
  url: z.string().nullish(),
  ireneBotId: z.number().nullish(),
  ireneBotIdolId: z.number().nullish(),
  ireneBotIdolName: z.string().nullish(),
})

type UploadSchema = z.infer<typeof UploadSchema>

export default handle(
  withUser(
    withFileUpload(
      async (req, res, { upload, db: prisma, user, contextType }) => {
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
            if (err instanceof UploadError) {
              res.status(err.status).json({ error: err.message })
              return
            } else {
              console.error(err)
              res.status(500).json({ error: "Internal server error" })
              return
            }
          }

          return res.json(image)
        } catch (err) {
          console.log(err)
          res.status(500).json({ error: "Internal Server Error" })
        }
      }
    ),
    { strict: true }
  )
)
