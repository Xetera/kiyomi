import { Maybe, Person } from "@/lib/__generated__/graphql"

type PreferredNameProps = {
  preferredAlias?: Maybe<{
    name?: Maybe<string>
  }>
  name: Person["name"]
}

export const personPreferredName = (person: PreferredNameProps) => {
  return person.preferredAlias?.name ?? person.name
}
