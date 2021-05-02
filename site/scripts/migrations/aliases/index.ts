import members from "../../members.json";
import allAliases from "./aliases.json";
import { sdk } from "@/scripts/client";

const memberIds = allAliases.filter((f) => !f.isgroup);
(async () => {
  for (const member of members) {
    const aliases = memberIds
      .filter((f) => f.objectid === member.id)
      .map((f) => f.alias);
    if (member.stagename) {
      aliases.push(member.stagename)
    }
    const aliasesOp = {
      create: aliases.map(alias => ({
        name: alias
      }))
    }
    sdk.upsertPerson({
      where: {
        ireneBotId: member.id,
      },
      create: {
        ireneBotId: member.id,
        name: member.fullname,
        aliases: aliasesOp
      },
      update: {
        name: { set: member.fullname },
        aliases: aliasesOp
      }
    }).then(console.log, console.error)
  }
  console.log('finished!')
})();
