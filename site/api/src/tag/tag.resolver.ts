import { TagService } from "./tag.service";
import { MediaService } from "../media/media.service";
import { TagModel } from "./models";
import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { Tag } from "@prisma/client";
import { MediaModel } from "../media/models";
import { TagAliasModel } from "./models/tag-alias.model";

@Resolver(() => TagModel)
export class TagResolver {
  constructor(
    private readonly tagService: TagService,
  ) {}

  @ResolveField(() => [TagAliasModel])
  async aliases(
    @Parent()
      tag: Tag,
  ) {
    return this.tagService.aliases(tag.id)
  }
}