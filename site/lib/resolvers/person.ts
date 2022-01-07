import {
  inputObjectType,
  list,
  mutationField,
  nonNull,
  objectType,
  queryField,
} from "nexus"
import { GraphqlAuth } from "@/lib/auth"
import { Role } from "@/lib/permissions"
import { siteEvent } from "@/lib/observer"

export const Person = objectType({
  name: "Person",
  definition(t) {
    t.model
      .id()
      .name()
      .birthDate()
      .aliases()
      .preferredAlias()
      .appearsIn({ alias: "faces" })
      .appearances()
      .memberOf()
      .preferredMembership()
      .avatar()
      .banner()
      .updatedAt()
      .createdAt()
  },
})

const GroupMembership = inputObjectType({
  name: "GroupMembership",
  definition(t) {
    t.nonNull.int("id")
    t.string("startDate")
    t.string("endDate")
  },
})

export const UpdatePersonInputs = inputObjectType({
  name: "UpdatePersonInputs",
  definition(t) {
    t.nonNull.string("name")
    t.string("description")
    t.field("gender", { type: "Gender" })
    t.field("birthDate", { type: "DateTime" })
    t.nonNull.list.nonNull.string("aliases")
    t.int("preferredAliasId")
    t.nonNull.field("groups", { type: list(nonNull(GroupMembership)) })
    t.int("preferredMembershipId")
    t.int("avatarId")
    t.int("bannerId")
  },
})

export const Mutation = mutationField((t) => {
  const authorize = GraphqlAuth.hasRole([Role.Editor])
  t.field("updatePerson", {
    type: "Person",
    authorize,
    args: {
      id: nonNull("Int"),
      update: nonNull(UpdatePersonInputs),
    },
    async resolve(_, args, { user, person }) {
      if (!user) {
        throw Error("Unauthorized")
      }
      return person.updatePerson({
        input: args.update,
        userId: user.id,
        personId: args.id,
      })
    },
  })
})

export const Query = queryField((t) => {
  t.crud.people({ pagination: true, filtering: true, ordering: true })
  t.crud.person()
})

export const PrivateQuery = queryField((t) => {})

export const PrivateMutation = mutationField((t) => {
  t.crud.createOnePerson()
  t.crud.upsertOnePerson()
})
