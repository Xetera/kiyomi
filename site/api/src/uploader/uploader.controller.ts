import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Logger,
  Post,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common"
import { Request, Response } from "express"
import { UploadRequestDto } from "./upload-request.dto"
import { AuthenticationService } from "../authentication/authentication.service"
import {
  IreneBotUploadOptions,
  UploadError,
  UploaderService,
} from "./uploader.service"
import { Image } from "@prisma/client"
import { TokenAuthGuard } from "../authentication/token-auth.guard"
import fetch from "node-fetch"
import { Roles } from "../authentication/roles.decorator"
import { RoleKind } from "../authentication/role"

@Controller("upload")
export class UploaderController {
  logger = new Logger(UploaderController.name)

  constructor(
    private readonly uploader: UploaderService,
    private readonly auth: AuthenticationService,
  ) {}

  @Post()
  @Roles(RoleKind.EDITOR)
  @UseGuards(TokenAuthGuard)
  // TODO: allow file interceptors for image uploads
  async upload(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: UploadRequestDto,
  ) {
    const contextType = "TOKEN"

    const user = req.user
    if (!user) {
      this.logger.warn(
        "Got an unauthorized user request for a route with an auth guard",
      )
      throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED)
    }

    let buffer: ArrayBuffer
    try {
      // TODO: Potential SSRF problem but this endpoint should only be accessible by admins
      buffer = await fetch(body.url).then((res) => res.arrayBuffer())
    } catch (err) {
      console.error(err)
      throw new HttpException(
        "Could not download target url",
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }

    const irene: IreneBotUploadOptions | undefined =
      body.ireneBotIdolId && body.ireneBotId && body.ireneBotIdolName
        ? {
            id: body.ireneBotId,
            idolId: body.ireneBotIdolId,
            idolName: body.ireneBotIdolName,
          }
        : undefined

    let image: Image
    try {
      image = await this.uploader.uploadMedia({
        irene,
        public: body.public ?? true,
        fileName: undefined,
        buffer: Buffer.from(buffer),
        uploader: user,
        uploadType: contextType,
        personId: body.personId ?? undefined,
      })
    } catch (err) {
      if (err instanceof UploadError) {
        this.logger.log(err)
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR)
      } else if (err instanceof Error) {
        this.logger.error(err)
        throw new HttpException(
          "Internal Server Error",
          HttpStatus.INTERNAL_SERVER_ERROR,
        )
      }
      this.logger.warn("Got something unexpected thrown in uploader")
      throw new HttpException(
        "Something went very wrong...",
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }

    return image
  }
}
