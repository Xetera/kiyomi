import { backend } from "~/shared/sdk"
import { ServerImage, ServerPerson } from "./messaging"

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
): Promise<ServerImage[]> {
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
