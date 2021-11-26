import { objectType, queryField, mutationField } from "nexus"

export const Person = objectType({
  name: "Person",
  definition(t) {
    t.model
      .id()
      .name()
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

export const Query = queryField((t) => {
  t.crud.people({ pagination: true, filtering: true })
  t.crud.person()
})

export const PrivateQuery = queryField((t) => {})

export const PrivateMutation = mutationField((t) => {
  t.crud.createOnePerson()
  t.crud.upsertOnePerson()
})
