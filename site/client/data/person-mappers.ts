import { Maybe, Person } from "@/lib/__generated__/graphql"
import { SearchResponseHit } from "typesense/lib/Typesense/Documents"
import { SearchIdol } from "@/client/typesense"
import { Routing } from "@/client/routing"

type PreferredNameProps = {
  preferredAlias?: Maybe<{
    name?: Maybe<string>
  }>
  name: Person["name"]
}

export const personPreferredName = (person: PreferredNameProps) => {
  return person.preferredAlias?.name ?? person.name
}

export const defaultIdolHitMapper = (hit: SearchResponseHit<SearchIdol>) => ({
  href: Routing.toPerson(
    Number(hit.document.personId),
    personPreferredName({
      name: hit.document.name,
      preferredAlias: { name: hit.document.preferredAlias },
    })
  ),
})
