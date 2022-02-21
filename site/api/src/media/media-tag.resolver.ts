import { Parent, ResolveField, Resolver } from "@nestjs/graphql"
import { MediaModel } from "./models"
import { MediaService } from "./media.service"
import { TagService } from "../tag/tag.service"
import { ImageTag, Tag, User } from "@prisma/client"
import { MediaTagModel } from "./models/media-tag.model"
import { TagModel } from "../tag/models"
import { UserModel } from "../user/models/user.model";

@Resolver(() => MediaTagModel)
export class MediaTagResolver {
  constructor(
    private readonly tagService: TagService,
    private readonly mediaService: MediaService,
  ) {
  }

  @ResolveField(() => TagModel)
  async tag(@Parent() mediaTag: ImageTag): Promise<Tag> {
    const tag = await this.tagService.tagByImageTagId(mediaTag.id)
    if (!tag) {
      // TODO: better unexpected error handling?
      throw new Error("Tag not found")
    }
    return tag
  }

  @ResolveField(() => UserModel)
  async addedBy(@Parent() media: ImageTag): Promise<User | undefined> {
    return this.tagService.mediaTagAdder(media.id)
  }
}
