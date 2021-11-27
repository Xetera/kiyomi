import { objectType, queryField } from "nexus"

export const DiscoveredImage = objectType({
  name: "DiscoveredImage",
  definition(t) {
    t.model
      .id()
      .duplicateImage()
      .votes()
      .referenceUrl()
      .uniqueIdentifier()
      .verdict()
      .url()
      .image({ alias: "approvedImage" })
      .providerType()
      .createdAt()
      .updatedAt()
  },
})

export const Query = queryField((t) => {
  t.crud.discoveredImages({ pagination: true, ordering: true, filtering: true })
})
