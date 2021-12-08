export type MeiliSearchGroup = {
  name: string
  aliases: string[]
}

export type MeiliSearchIdol = {
  name: string
  aliases: string[]
}

export type MeiliSearchHit<T> = T & { _formatted: T }

export type MeiliSearchQueryResult<T> = {
  exhaustiveHbHits: boolean
  hits: Array<MeiliSearchHit<T>>
  nbHits: number
  processingTimeMs: number
}

const query = <T>(name: string) => (
  query: string
): Promise<MeiliSearchQueryResult<T>> =>
  fetch(`${process.env.NEXT_PUBLIC_MEILISEARCH_URL}/indexes/${name}/search`, {
    method: "POST",
    body: JSON.stringify({ q: query, limit: 6, attributesToHighlight: ["*"] }),
  }).then((r) => r.json())

export const searchIdols = query<MeiliSearchIdol>("idols")
export const searchGroups = query<MeiliSearchGroup>("groups")
