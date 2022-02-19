import { Fetcher } from "@remix-run/react/transition"
import React, { ReactNode, useEffect, useRef, useState } from "react"
import { useLoaderData } from "remix"

const DEFAULT_TAKE = 40

const defaultFetchOptions = (skip: number, take: number): URLSearchParams => {
  return new URLSearchParams([
    ["skip", String(skip)],
    ["take", String(take)],
  ])
}

export type UsePaginatedOptions<T, K> = {
  forceFetch?: boolean
  perPage?: number
  fetchOptions?: (skip: number) => URLSearchParams
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
  const transformedLoader = useLoaderData<T>()

  const [data, setData] = useState(opts.transform(transformedLoader))
  const page = useRef(0)
  function loadMore() {
    if (fetcher.state === "loading") return
    const options = opts.fetchOptions ?? defaultFetchOptions
    const perPage = opts.perPage ?? DEFAULT_TAKE
    const qs = options(page.current * perPage, perPage)

    fetcher.load(`${opts.href}?${qs}`)
    page.current += 1
  }
  useEffect(() => {
    if (fetcher.data) {
      const nextItems = opts.transform(fetcher.data)
      setData(data.concat(nextItems))
    }
  }, [fetcher.data])
  useEffect(() => {
    if (opts.forceFetch) {
      loadMore()
    }
  }, [])
  return { data, loadMore, fetcher }
}

export type usePaginated = ReturnType<typeof usePaginated>
