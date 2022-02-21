import { Args, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql"
import { MediaModel } from "./models"
import { MediaService } from "./media.service"
import { TagService } from "../tag/tag.service"
import { Appearance, Image, ImageTag } from "@prisma/client"
import { MediaTagModel } from "./models/media-tag.model"
import { UserService } from "../user/user.service"
import { AppearanceModel } from "../appearance/models/appearance.model"
import { AppearanceService } from "../appearance/appearance.service"

@Resolver(() => MediaModel)
export class MediaResolver {
  constructor(
    private readonly tagService: TagService,
    private readonly userService: UserService,
    private readonly mediaService: MediaService,
    private readonly appearanceService: AppearanceService,
  ) {
  }

  @Query(() => MediaModel, { nullable: true })
  media(@Args("slug") slug: string) {
    return this.mediaService.findBySlug(slug)
  }

  @ResolveField(() => [MediaTagModel])
  tags(@Parent() media: Image): Promise<ImageTag[]> {
    return this.mediaService.tags(media.id)
  }

  @ResolveField(() => [AppearanceModel])
  appearances(@Parent() media: Image): Promise<Appearance[]> {
    return this.appearanceService.imageAppearances(media.id)
  }

  @ResolveField()
  async uploadedBy(@Parent() image: Image) {
    if (!image.userId) {
      return
    }
    return this.userService.getById(image.userId)
  }
}
