import {
  inputObjectType,
  list,
  mutationField,
  nonNull,
  objectType,
  queryField,
} from "nexus"
import camelCaseKeys from "camelcase-keys"
import { GraphqlAuth } from "../auth"

export const DiscoveryStatistic = objectType({
  name: "DiscoveryStatistic",
  definition(t) {
    t.nonNull.field("verdict", {
      type: nonNull("String"),
    })
    t.nonNull.field("count", {
      type: nonNull("Int"),
    })
  },
})

export const ProviderStats = objectType({
  name: "ProviderStatistic",
  description: "Statistics associated with each provider",
  definition(t) {
    t.nonNull.string("name")
    t.nonNull.string("destination")
    t.nonNull.boolean("enabled")
    t.nonNull.string("url")
    t.nonNull.float("priority")
    t.nonNull.float("tokens")
    t.field("createdAt", {
      type: "DateTime",
    })
    t.string("defaultName")
    t.nonNull.boolean("official")
    t.field("lastScrape", {
      type: "DateTime",
    })
    t.field("lastPost", {
      type: "DateTime",
    })
    t.nonNull.int("discoveredImages")
    t.nonNull.int("scrapeCount")
  },
})

export const DiscoveryProvider = objectType({
  name: "DiscoveryProvider",
  description:
    "The list of providers that supply images for the discovery feed",
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
    t.nonNull.field("official", {
      type: "Boolean",
    })
  },
})

export const Query = queryField((t) => {
  t.nonNull.field("discoveryStats", {
    type: nonNull(list(nonNull(DiscoveryStatistic))),
    authorize: GraphqlAuth.isLoggedIn,
    async resolve(root, _, { discovery, user }) {
      return discovery.discoveryStats(user!.id)
    },
  })
  t.nonNull.field("discoverySchedule", {
    type: list(nonNull(DiscoveryProvider)),
    resolve(root, _, { jiu }) {
      return jiu.schedule()
    },
  })
  t.nonNull.field("discoveryProviders", {
    type: nonNull(list(nonNull(ProviderStats))),
    resolve(root, _, { jiu }) {
      return jiu.providers()
    },
  })
  t.crud.discoveredImages({ pagination: true, ordering: true, filtering: true })
})

const AddProviderInput = inputObjectType({
  name: "AddProviderInput",
  definition(t) {
    t.nonNull.string("name")
    t.nonNull.string("url")
    t.nonNull.boolean("official")
    t.nonNull.field("people", {
      type: nonNull(list(nonNull("Int"))),
    })
    t.nonNull.field("groups", {
      type: nonNull(list(nonNull("Int"))),
    })
  },
})

export const Mutation = mutationField((t) => {
  t.nonNull.field("addProvider", {
    type: nonNull("String"),
    args: {
      provider: nonNull(AddProviderInput),
    },
    async resolve(root, args, { jiu }) {
      const response = await jiu.addProvider({
        name: args.provider.name,
        url: args.provider.url,
        official: args.provider.official,
        metadata: {
          groups: args.provider.groups,
          people: args.provider.people,
        },
        add_to_amqp: true,
      })
      return response
    },
  })
})
