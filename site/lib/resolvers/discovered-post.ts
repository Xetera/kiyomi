import { list, objectType, queryField } from "nexus"

export const DiscoveredPost = objectType({
  name: "DiscoveredPost",
  definition(t) {
    t.model
      .id()
      .uniqueIdentifier()
      .discoveredImages({ alias: "images" })
      .body()
      .postUrl()
      .providerType()
      .accountName()
      .accountAvatarUrl()
      .originalPostDate()
      // TODO: make this a manual query that does a fetchAll
      // .referencingGroups({ description: "Groups" })
      // .referencingPeople()
      .createdAt()
      .updatedAt()
  },
})

export const Query = queryField((t) => {
  t.crud.discoveredPosts({ pagination: true, filtering: true, ordering: true })
})
