import {
  buildAugmentedResults,
  ClientSearchGroup,
  ClientSearchPerson,
  MeiliResult,
  PersonChoice,
  PersonPool,
} from "../../shared/game"
import { backend } from "../../shared/sdk"
import { GuessingPrompt, ServerPerson } from "./messaging"
import LRU from "lru-cache"

const url = (type: string) =>
  new URL(`/indexes/${type}/search`, process.env.MEILISEARCH_URL).href

const cache = new LRU<string, PersonPool>({ maxAge: 1000 * 60 * 60, max: 200 })

export async function fromPersonIds(
  ids: number[]
): Promise<Record<string, PersonPool>> {
  const key = ids.join()
  let out
  if (ids.length > 0 && (out = cache.get(key))) {
    return out
  }
  let people: MeiliResult<ClientSearchPerson> | undefined
  if (ids.length > 0) {
    people = await fetch(url("idols"), {
      method: "POST",
      body: JSON.stringify({
        limit: 5000,
        filters: ids.map((id) => `id = ${id}`).join(" OR "),
      }),
    }).then((r) => r.json())
  }

  let groups: MeiliResult<ClientSearchGroup> | undefined
  if (people) {
    groups = await fetch(url("groups"), {
      method: "POST",
      body: JSON.stringify({
        limit: 5000,
        filters: people.hits
          .flatMap((hit) => hit.groups.map((g) => `id = ${g}`))
          .join(" OR "),
      }),
    }).then((r) => r.json())
  }

  out = buildAugmentedResults(groups?.hits ?? [], people?.hits ?? [])
  cache.set(key, out)

  return out
}

export async function getGroupAppearanceCounts(
  people: number[]
): Promise<number[]> {
  return people
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
