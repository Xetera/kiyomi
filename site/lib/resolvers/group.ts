import { objectType, queryField, mutationField } from "nexus"

export const Group = objectType({
  name: "Group",
  definition(t) {
    t.model
      .id()
      .name()
      .avatar()
      .banner()
      .aliases()
      .members()
      .createdAt()
      .updatedAt()
  },
})

export const Query = queryField((t) => {
  t.crud.group()
  t.crud.groups({ pagination: true, filtering: true, ordering: true })
})

export const PrivateMutation = mutationField((t) => {
  t.crud.upsertOneGroup()
})
