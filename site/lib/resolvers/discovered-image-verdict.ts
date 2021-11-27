import { objectType } from "nexus"

export const DiscoveredImageVerdict = objectType({
  name: "DiscoveredImageVerdict",
  definition(t) {
    t.model.id().verdict().reason().createdAt()
  },
})
