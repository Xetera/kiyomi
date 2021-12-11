import fetch from "node-fetch"
import { PrismaClient } from "@prisma/client"
import uniqBy from "lodash/uniqBy"
import { Client } from "typesense"

const prod = process.env.NODE_ENV === "production"

const typesense = new Client({
  apiKey: "test",
  nodes: [{ host: "localhost", path: "/", port: 8080, protocol: "http" }],
})

let index = "typesense" // meilisearch

;(async () => {
  console.log(process.env.POSTGRES_URL)
  const client = new PrismaClient({
    datasources: {
      db: {
        url: process.env.POSTGRES_URL,
      },
    },
  })
  // const { people } = await backend.query({
  //   people: [
  //     {},
  //     {
  //       id: true,
  //       name: true,
  //       aliases: { name: true },
  //       memberOf: {
  //         group: {
  //           id: true,
  //         },
  //       },
  //     },
  //   ],
  // })
  const people = await client.$queryRaw(
    `
    SELECT persons.id, persons.name, json_agg(gm.*) as groups, json_agg(a.*) as aliases
FROM persons
         inner join group_members gm on gm.person_id = persons.id
         inner join aliases a on persons.id = a.person_id
-- where persons.id = 4
group by persons.id, persons.name`
  )

  const groups = await client.group.findMany({
    select: { aliases: true, name: true, id: true },
  })

  const PREFIX = prod ? "https://search.mamamoo.solar" : "http://localhost:7700"

  const toUpload = people.map((person: any) => ({
    personId: person.id,
    name: person.name,
    aliases: uniqBy(person.aliases, (alias: any) => alias.name).map(
      (alias: any) => alias.name
    ),
    groups: groups.flatMap((g) =>
      uniqBy(person.groups, (g: any) => g.groupId)
        .filter((mem: any) => mem.groupId === g.id)
        .map((mem: any) => mem.groupId)
    ),
  }))

  const groupUpload = groups.map((group) => ({
    groupId: group.id,
    name: group.name,
    aliases: group.aliases.map((alias) => alias.name),
  }))
  const person = toUpload.find((e) => e.aliases.includes("Irene"))

  console.log({ a: toUpload.length })
  if (index === "meilisearch") {
    await fetch(`${PREFIX}/indexes/idols/documents`, {
      method: "POST",
      body: JSON.stringify(toUpload),
    })

    await fetch(`${PREFIX}/indexes/groups/documents`, {
      method: "POST",
      body: JSON.stringify(groupUpload),
    })
  } else {
    await typesense.collections("groups").delete()
    await typesense.collections("people").delete()
    await typesense.collections().create({
      name: "people",
      fields: [
        {
          name: "name",
          type: "string",
          facet: true,
        },
        {
          name: "aliases",
          type: "string[]",
          facet: true,
        },
      ],
    })
    await typesense.collections().create({
      name: "groups",
      fields: [
        {
          name: "name",
          type: "string",
          facet: true,
        },
        {
          name: "aliases",
          type: "string[]",
          facet: true,
        },
      ],
    })
    await typesense
      .collections("people")
      .documents()
      .import(toUpload.map((obj) => JSON.stringify(obj)).join("\n"), {
        action: "create",
        dirty_values: "coerce_or_reject",
      })
    await typesense
      .collections("groups")
      .documents()
      .import(groupUpload.map((obj) => JSON.stringify(obj)).join("\n"), {
        action: "create",
        dirty_values: "coerce_or_reject",
      })
  }
})()
