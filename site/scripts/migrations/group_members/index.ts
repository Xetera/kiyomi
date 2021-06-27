import { PrismaClient } from ".prisma/client"
import members from "./members.json"
;(async () => {
  const client = new PrismaClient({
    datasources: {
      db: {
        url: process.env.POSTGRES_URL,
      },
    },
  })

  for (const [id, mems] of Object.entries(members)) {
    const nid = Number(id)
    for (const memberId of mems.members) {
      const [person, group] = await Promise.all([
        client.person.findUnique({
          where: { ireneBotId: memberId },
        }),
        client.group.findUnique({
          where: { ireneBotId: nid },
        }),
      ])
      console.log({ person })
      if (!person) {
        throw Error(`Invalid person ${memberId}`)
      }
      if (!group) {
        throw Error(`Invalid group ${nid}`)
      }
      client.groupMember
        .upsert({
          where: { member: { groupId: group.id, personId: person.id } },
          update: {},
          create: {
            groupId: group.id,
            personId: person.id,
          },
        })
        .catch((err) => {
          console.log({ [id]: mems })
          console.log({ memberId })
          console.log(err)
          process.exit(1)
        })
    }
  }
  process.exit(0)
})().catch(console.error)
