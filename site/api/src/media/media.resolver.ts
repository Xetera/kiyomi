import {
  Args,
  Float,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from "@nestjs/graphql"
import { MediaModel, MediaThumbnailModel } from "./models"
import { MediaService } from "./media.service"
import { TagService } from "../tag/tag.service"
import { Appearance, Image, ImageTag, User } from "@prisma/client"
import { MediaTagModel } from "./models/media-tag.model"
import { UserService } from "../user/user.service"
import { AppearanceModel } from "../appearance/models/appearance.model"
import { AppearanceService } from "../appearance/appearance.service"
import { UserModel } from "../user/models/user.model"
import { PaginationArgs } from "../common-dto/pagination.args"
import { ImgProxyService } from "../imgproxy/imgproxy.service"
import { UploaderService } from "../uploader/uploader.service";

@Resolver(() => MediaModel)
export class MediaResolver {
  private static readonly ASPECT_RATIO_PRECISION = 2

  constructor(
    private readonly tagService: TagService,
    private readonly userService: UserService,
    private readonly mediaService: MediaService,
    private readonly uploaderService: UploaderService,
    private readonly appearanceService: AppearanceService,
    private readonly imgProxyService: ImgProxyService,
  ) {}

  @Query(() => MediaModel, { nullable: true })
  media(@Args("slug") slug: string): Promise<Image | null> {
    return this.mediaService.findBySlug(slug)
  }

  @ResolveField(() => [MediaTagModel])
  tags(
    @Parent() media: Image,
    @Args() pagination: PaginationArgs,
  ): Promise<ImageTag[]> {
    return this.mediaService.tags(media.id, pagination)
  }

  @ResolveField(() => [AppearanceModel])
  appearances(
    @Parent() media: Image,
    @Args() pagination: PaginationArgs,
  ): Promise<Appearance[]> {
    return this.appearanceService.imageAppearances(media.id, pagination)
  }

  @ResolveField(() => UserModel)
  async uploadedBy(@Parent() image: Image): Promise<User | undefined | null> {
    if (!image.userId) {
      return
    }
    return this.userService.getById(image.userId)
  }

  @ResolveField(() => String)
  url(@Parent() image: Image) {
    return this.uploaderService.mediaUrl(image)
  }

  @ResolveField(() => Float)
  aspectRatio(@Parent() image: Image): number {
    return Number(
      (image.width / image.height).toFixed(
        MediaResolver.ASPECT_RATIO_PRECISION,
      ),
    )
  }

  @ResolveField(() => MediaThumbnailModel)
  thumbnail(@Parent() image: Image): MediaThumbnailModel {
    return this.imgProxyService.thumbnails(image)
  }
}
