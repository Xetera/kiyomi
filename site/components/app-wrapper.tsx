import { useSelector } from "react-redux"
import { RootState, store } from "@/models/store"
import { QuickSearch } from "@/components/search/QuickSearch"
import { useEffect } from "react"

export function AppWrapper({ children }) {
  const isOpen = useSelector((root: RootState) => root.search?.open)

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      // if (event.key === "/") {
      //   toggleSearch()
      // }
    }
    document.addEventListener("keydown", listener)
    return () => document.removeEventListener("keydown", listener)
  }, [])

  function toggleSearch() {
    store.dispatch.search.toggleSearch()
  }

  if (isOpen) {
    return (
      <>
        {children}
        <QuickSearch onClose={toggleSearch} />
      </>
    )
  }
  return children
}
