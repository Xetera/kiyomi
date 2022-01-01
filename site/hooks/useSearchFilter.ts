import { useList } from "react-use"
import { SearchTag } from "@/components/discover/search-tags"

export type SearchFilterHandle = {
  filters: SearchTag[]
  addFilter(tag: SearchTag): void
  removeFilter(tag: SearchTag): void
}

export const useSearchFilter = (type?: string): SearchFilterHandle => {
  const [filters, f] = useList<SearchTag>()
  function addFilter(tag: SearchTag) {
    f.push(tag)
  }

  function removeFilter(tag: SearchTag) {
    const index = filters.findIndex(
      (f) => f.type === tag.type && f.id === tag.id
    )
    if (index === -1) {
      console.warn(
        `Search filter for [${type}] with id ${tag.id} was not saved`
      )
    }
    f.removeAt(index)
  }
  return {
    filters,
    addFilter,
    removeFilter,
  }
}
