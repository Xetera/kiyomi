import members from "../../members.json"
import allAliases from "./aliases.json"
import { PrismaClient } from "@prisma/client"

const memberIds = allAliases.filter((f) => !f.isgroup)
export async function run(url: string) {
  const client = new PrismaClient({
    datasources: {
      db: {
        url: process.env.POSTGRES_URL,
      },
    },
  })

  for (const [id, member] of Object.entries(members)) {
    const memberId = Number(id)
    const aliases = memberIds
      .filter((f) => f.objectid === memberId)
      .map((f) => f.alias)
    if (member.stage_name) {
      aliases.push(member.stage_name)
    }
    const aliasesOp = {
      create: aliases.map((alias) => ({
        name: alias,
      })),
    }
    client.person
      .upsert({
        where: {
          ireneBotId: memberId,
        },
        create: {
          ireneBotId: memberId,
          name: member.full_name,
          aliases: aliasesOp,
        },
        update: {
          name: { set: member.full_name },
        },
      })
      .then(console.log, console.error)
  }
  console.log("finished!")
}

run("http://localhost:3000")
