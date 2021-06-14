import { toUpper } from "lodash"
import {
  getTokenSourceMapRange,
  isExpressionWithTypeArguments,
} from "typescript"
import { PersonChoice } from "../../shared/game"
import { backend } from "../../shared/sdk"
import { GuessingPrompt, ServerPerson } from "./messaging"

export async function getGroupAppearanceCounts(
  people: number[]
): Promise<PersonChoice[]> {
  // const counts = await backend.query({
  //   countAppearances: [
  //     { groups },
  //     {
  //       count: true,
  //       group: {
  //         id: true,
  //       },
  //     },
  //   ],
  // })
  return people.map((personId) => ({ personId }))
  // return counts.countAppearances.map((pr) => ({
  //   groupId: pr.group.id,
  //   count: pr.count,
  // }))
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
  const serverGroupFields = {
    id: true,
    name: true,
    aliases: {
      name: true,
    },
  } as const
  const result = await backend.query({
    personImages: [
      { personIds },
      {
        face: {
          x: true,
          y: true,
          width: true,
          height: true,
        },
        image: {
          id: true,
          slug: true,
          thumbnail: {
            small: true,
            medium: true,
            large: true,
          },
        },
        person: {
          id: true,
          name: true,
          aliases: {
            name: true,
          },
          preferredMembership: {
            group: serverGroupFields,
          },
          memberOf: {
            group: serverGroupFields,
          },
        },
      },
    ],
  })

  return result.personImages.map((res) => ({
    image: res.image,
    face: res.face,
    answer: res.person,
  }))
}
