import React, { useEffect } from "react"

export default function useOnClickOutside(
  ref: React.MutableRefObject<any>,
  f: () => void
) {
  function handleClick(e: Event) {
    if (ref.current.contains(e.target)) {
      return
    }
    f()
  }
  useEffect(() => {
    // add when mounted
    document.addEventListener("mousedown", handleClick)
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", handleClick)
    }
  }, [])
}
