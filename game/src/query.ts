import { GroupChoice } from "~/shared/game"
import { backend } from "~/shared/sdk"
import { GuessingPrompt, ServerPerson } from "./messaging"

export async function getGroupAppearanceCounts(
  groups: number[]
): Promise<GroupChoice[]> {
  const counts = await backend.query({
    countAppearances: [
      { groups },
      {
        count: true,
        group: {
          id: true,
        },
      },
    ],
  })
  return counts.countAppearances.map((pr) => ({
    groupId: pr.group.id,
    count: pr.count,
  }))
}

export async function fetchAllPeople(): Promise<Array<ServerPerson>> {
  const groupQuery = {
    id: true,
    name: true,
    aliases: { name: true },
  } as const
  const r = await backend.query({
    people: [
      {},
      {
        aliases: {
          name: true,
        },
        name: true,
        id: true,
        preferredMembership: {
          group: groupQuery,
        },
        memberOf: {
          group: groupQuery,
        },
      },
    ],
  })
  return r.people
}

export async function fetchAllImages(
  personIds: number[]
): Promise<GuessingPrompt[]> {
  const result = await backend.query({
    personImages: [
      { personIds },
      {
        id: true,
        slug: true,
      },
    ],
  })
  return result.personImages
}
