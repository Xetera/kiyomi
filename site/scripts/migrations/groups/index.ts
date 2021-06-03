import { PrismaClient } from ".prisma/client"
import { createSdk } from "../../client"
import aliases from "../aliases/aliases.json"
import groups from "./groups.json"
import { capitalize } from "lodash"
;(async () => {
  const groupAliases = aliases.filter((al) => al.isgroup === 1)
  const client = new PrismaClient({
    datasources: {
      db: {
        url: process.env.POSTGRES_URL,
      },
    },
  })

  for (const [id, groupName] of Object.entries(groups)) {
    const nid = Number(id)
    await client.group.upsert({
      where: { ireneBotId: nid },
      update: {
        name: { set: groupName },
        ireneBotId: nid,
      },
      create: {
        name: groupName,
        ireneBotId: nid,
        aliases: {
          create: groupAliases
            .filter((al) => al.objectid === nid)
            .map((a) => ({ name: capitalize(a.alias) })),
        },
      },
    })
  }
  process.exit(0)
})().catch(console.error)
