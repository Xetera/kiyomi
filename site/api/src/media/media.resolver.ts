import { Args, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql"
import { MediaModel } from "./models"
import { MediaService } from "./media.service"
import { TagService } from "../tag/tag.service"
import { Image, ImageTag } from "@prisma/client"
import { MediaTagModel } from "./models/media-tag.model"

@Resolver(() => MediaModel)
export class MediaResolver {
  constructor(
    private readonly tagService: TagService,
    private readonly mediaService: MediaService,
  ) {
  }

  @Query(() => MediaModel, { nullable: true })
  media(@Args("slug") slug: string): Promise<Image> {
    return this.mediaService.findBySlug(slug)
  }

  @ResolveField(() => [MediaTagModel])
  tags(@Parent() media: Image): Promise<ImageTag[]> {
    return this.mediaService.tags(media.id)
  }

  //
  // @ResolveField()
  // async thumbnails() {
  //
  // }
}
