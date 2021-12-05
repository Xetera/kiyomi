import { enumType, objectType } from "nexus"
import capitalize from "lodash/capitalize"

export const DiscoveryVerdictKind = enumType({
  name: "DiscoveryVerdictKind",
  description: "A verdict on how a discovery should be processed.",
  members: [
    {
      name: "Decline",
      value: "Decline",
      description: "Image/post should be rejected",
    },
    {
      name: "Approve",
      value: "Approve",
      description: "Image/post should be approved",
    },
    {
      name: "Merge",
      value: "Merge",
      description:
        "Image/post should have its sources merged with an existing duplicate",
    },
  ],
})

export const DiscoveredImageVerdict = objectType({
  name: "DiscoveredImageVerdict",
  definition(t) {
    t.model.id().reason().createdAt().verdict()
  },
})
