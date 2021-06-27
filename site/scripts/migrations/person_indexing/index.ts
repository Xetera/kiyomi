import fetch from "node-fetch"
import { backend } from "../../../../shared/sdk"
import { PrismaClient } from "@prisma/client"
import { uniqBy } from "lodash"
const prod = process.env.NODE_ENV === "production"

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
         inner join group_members gm on gm."personId" = persons.id
         inner join aliases a on persons.id = a.person_id
-- where persons.id = 4
group by persons.id, persons.name`
  )

  const groups = await client.group.findMany({
    select: { aliases: true, name: true, id: true },
  })

  const PREFIX = prod ? "https://search.mamamoo.solar" : "http://localhost:7700"

  const toUpload = people.map((person: any) => ({
    id: person.id,
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

  await fetch(`${PREFIX}/indexes/idols/documents`, {
    method: "POST",
    body: JSON.stringify(toUpload),
  })
  const groupUpload = groups.map((group) => ({
    id: group.id,
    name: group.name,
    aliases: group.aliases.map((alias) => alias.name),
  }))
  await fetch(`${PREFIX}/indexes/groups/documents`, {
    method: "POST",
    body: JSON.stringify(groupUpload),
  })
})()
