import { Maybe, Person } from "@/lib/__generated__/graphql"
import { slugify } from "@/client/string-helpers"

type PreferredNameProps = {
  preferredAlias?: Maybe<{
    name?: Maybe<string>
  }>
  name: Person["name"]
}

export const personPreferredName = (person: PreferredNameProps) => {
  return person.preferredAlias?.name ?? person.name
}

export const encodeUriFriendly = (id: number, readable?: string) => {
  if (!readable) {
    return String(id)
  }
  return `${id}-${slugify(readable)}`
}

export const decodeUriFriendly = (url: string) => {
  const [strId] = url.split("-")
  return Number(strId)
}
