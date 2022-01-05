import { SearchResponseHit } from "typesense/lib/Typesense/Documents"
import { SearchGroup } from "@/client/typesense"
import { Routing } from "@/client/routing"

export const defaultGroupHitMapper = (hit: SearchResponseHit<SearchGroup>) => ({
  href: Routing.toGroup(Number(hit.document.id), hit.document.name),
})
