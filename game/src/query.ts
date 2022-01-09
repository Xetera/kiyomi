import { buildAugmentedResults, PersonPool } from "../../shared/game"
import { backend } from "../../shared/sdk"
import { GuessingPrompt, ServerPerson } from "./messaging"
import LRU from "lru-cache"
import {
  getGroupsById,
  getPeopleById,
  IndexedGroup,
  IndexedPerson,
} from "../../shared/search"
import { SearchClient } from "typesense"
import { NodeConfiguration } from "typesense/lib/Typesense/Configuration"
import { SearchResponse } from "typesense/lib/Typesense/Documents"
import { config } from "./config"

export const typesense = new SearchClient({
  apiKey: config.get("typesenseKey"),
  nodes: [
    {
      url: config.get("typesenseUrl"),
    } as NodeConfiguration,
  ],
})

const cache = new LRU<string, Record<string, PersonPool>>({
  maxAge: 1000 * 60 * 60,
  max: 200,
})

export async function fromPersonIds(
  ids: number[]
): Promise<Record<string, PersonPool>> {
  const key = ids.join()
  let out: Record<string, PersonPool> | undefined
  if (ids.length > 0 && (out = cache.get(key))) {
    return out
  }
  let people: SearchResponse<IndexedPerson> | undefined
  if (ids.length > 0) {
    console.log(ids)
    people = await getPeopleById(typesense, ids)
  }

  let groups: SearchResponse<IndexedGroup> | undefined
  if (people) {
    groups = await getGroupsById(
      typesense,
      people.hits.flatMap((hit) => hit.document.groups)
    )
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
  console.time("fetch-people")
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
  console.timeEnd("fetch-people")
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
  console.time("image-refetch")
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
          width: true,
          height: true,
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
  console.timeEnd("image-refetch")
  return result.personImages.map((res) => ({
    image: res.image,
    face: res.face,
    answer: res.person,
  }))
}
