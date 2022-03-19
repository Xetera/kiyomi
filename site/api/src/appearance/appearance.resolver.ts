import { Parent, ResolveField, Resolver } from "@nestjs/graphql"
import { Appearance, AppearanceTag, Image, Person } from "@prisma/client"
import { AppearanceService } from "./appearance.service"
import { AppearanceTagModel } from "./models/appearance-tag.model"
import { PersonModel } from "../person/models/person.model"
import { UserService } from "../user/user.service"
import { UserModel } from "../user/models/user.model"
import { AppearanceModel } from "./models/appearance.model";
import { MediaService } from "../media/media.service";
import { forwardRef, Inject } from "@nestjs/common";
import { MediaModel } from "../media/models";

@Resolver(() => AppearanceModel)
export class AppearanceResolver {
  constructor(
    private readonly appearanceService: AppearanceService,
    @Inject(forwardRef(() => MediaService))
    private readonly mediaService: MediaService,
    private readonly userService: UserService,
  ) {}

  @ResolveField(() => [AppearanceTagModel])
  tags(@Parent() appearance: Appearance): Promise<AppearanceTag[]> {
    return this.appearanceService.appearanceTags(appearance.id)
  }

  @ResolveField(() => PersonModel)
  async person(@Parent() appearance: Appearance): Promise<Person> {
    const person = await this.appearanceService.appearancePerson(appearance.id)
    if (!person) {
      throw Error("No person")
    }
    return person
  }

  @ResolveField(() => UserModel)
  async addedBy(@Parent() appearance: Appearance) {
    if (!appearance.addedById) {
      return
    }
    return this.userService.getById(appearance.addedById)
  }

  @ResolveField(() => MediaModel)
  async media(@Parent() appearance: Appearance): Promise<Image> {
    const image = await this.mediaService.findById(appearance.imageId)
    if (!image) {
      throw Error("No image")
    }
    return image
  }
}