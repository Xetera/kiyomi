import { Fetcher } from "@remix-run/react/transition"
import React, { ReactNode, useEffect, useRef, useState } from "react"
import { useLoaderData } from "remix"

const defaultFetchOptions = (page: number, limit: number): URLSearchParams => {
  return new URLSearchParams([
    ["skip", String(page)],
    ["take", String(limit)],
  ])
}

export type UsePaginatedOptions<T, K> = {
  initialData?: T
  perPage?: number
  fetchOptions?: (page: number) => URLSearchParams
  href: string
  transform: (comp: T) => K[]
}

type FetcherWithComponents<TData> = Fetcher<TData> & {
  load: (href: string) => void
}

export const usePaginated = <T, K>(
  fetcher: FetcherWithComponents<T>,
  opts: UsePaginatedOptions<T, K>
) => {
  const transformedLoader = opts.transform(
    opts.initialData ?? useLoaderData<T>()
  )
  const [data, setData] = useState(transformedLoader)
  const page = useRef(0)
  function loadMore() {
    if (fetcher.state === "loading") return
    const options = opts.fetchOptions ?? defaultFetchOptions
    const perPage = opts.perPage ?? 40
    const qs = options(page.current, perPage)

    fetcher.load(`${opts.href}?${qs}`)
    page.current += perPage
  }
  useEffect(() => {
    if (fetcher.data) {
      const nextItems = opts.transform(fetcher.data)
      setData(data.concat(nextItems))
    }
  }, [fetcher.data])
  return { data, loadMore, fetcher }
}
