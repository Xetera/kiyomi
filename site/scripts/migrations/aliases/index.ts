import { getSdk } from "../../../__generated__/request";
import { GraphQLClient } from "graphql-request";
import members from "../../members.json";
import allAliases from "./aliases.json";

if (!process.env.URL) {
  throw Error("URL variable missing");
}

export const client = new GraphQLClient(`${process.env.URL}/api/internal`);

const memberIds = allAliases.filter((f) => !f.isgroup);
export const sdk = getSdk(client);
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
    try {
      const result = await sdk.upsertPerson({
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
      })
      console.log(result.upsertOnePerson)
    } catch (err) {
      console.error(err)
    }
  }
  console.log('finished!')
})();
