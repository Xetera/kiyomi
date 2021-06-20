import { useSelector } from "react-redux"
import isEqual from "react-fast-compare"
import { RootState } from "@/models/store"

export function useState<T>(f: (root: RootState) => T): T {
  return useSelector(f, isEqual)
}
