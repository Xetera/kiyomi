import { useSelector as useRawSelector } from "react-redux"
import isEqual from "react-fast-compare"
import { RootState } from "@/models/store"

export function useSelector<T>(f: (root: RootState) => T): T {
  return useRawSelector(f, isEqual)
}
