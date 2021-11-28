import { list, nonNull, objectType, queryField } from "nexus"

export const DiscoveryProvider = objectType({
  name: "DiscoveryProvider",
  description: "The list of providers that supply images for the discover feed",
  definition(t) {
    t.nonNull.field("provider", {
      type: "String",
    })
    t.nonNull.field("url", {
      type: "String",
    })
    t.nonNull.field("destination", {
      type: "String",
    })
    t.nonNull.field("waitDays", {
      description:
        "The number of days remaining until this provider is checked for updates again",
      type: "Int",
    })
    t.field("name", {
      type: "String",
    })
  },
})

export const Query = queryField((t) => {
  t.nonNull.field("discoveryProviders", {
    type: list(nonNull(DiscoveryProvider)),
    resolve(a, __, { jiu }) {
      return jiu.providers()
    },
  })
  t.crud.discoveredImages({ pagination: true, ordering: true, filtering: true })
})
