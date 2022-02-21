import { Resolver } from "@nestjs/graphql"
import { PersonModel } from "./models/person.model"

@Resolver(() => PersonModel)
export class PersonResolver {
}
