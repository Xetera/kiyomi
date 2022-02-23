import { useSelector } from "react-redux"
import { RootState, store } from "~/models/store"
import { QuickSearch } from "~/components/search/QuickSearch"
import { useCallback, useEffect } from "react"

export const AppWrapper: React.FC = ({ children }) => {
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

  const toggleSearch = useCallback(() => {
    store.dispatch.search.toggleSearch()
  }, [])

  return (
    <>
      {children}
      {isOpen && <QuickSearch onClose={toggleSearch} />}
    </>
  )
}
