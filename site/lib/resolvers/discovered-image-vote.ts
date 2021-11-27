import { objectType } from "nexus"

export const DiscoveredImageVote = objectType({
  name: "DiscoveredImageVote",
  definition(t) {
    t.model.id().user().verdict().reason().createdAt().updatedAt()
  },
})
