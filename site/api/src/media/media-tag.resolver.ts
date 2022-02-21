import { Args, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql"
import { MediaModel } from "./models"
import { MediaService } from "./media.service"
import { TagService } from "../tag/tag.service"
import { Image, Tag } from "@prisma/client";
import { ImageTag } from "@prisma/client";
import { MediaTagModel } from "./models/media-tag.model";
import { TagModel } from "../tag/models";

@Resolver(() => MediaTagModel)
export class MediaTagResolver {
  constructor(
    private readonly tagService: TagService,
    private readonly mediaService: MediaService,
  ) {}

  @ResolveField(() => TagModel)
  async tag(@Parent() mediaTag: ImageTag): Promise<Tag> {
    const tag = await this.tagService.tagByImageTagId(mediaTag.id)
    if (!tag) {
      // TODO: better unexpected error handling?
      throw new Error("Tag not found")
    }
    return tag
  }

  @ResolveField(() => [MediaTagModel])
  async tags(
    @Parent()
    media: MediaModel,
  ): Promise<ImageTag[]> {
    return this.mediaService.tags(media.id)
  }

  // @ResolveField()
  // async thumbnails() {
  //
  // }
}
