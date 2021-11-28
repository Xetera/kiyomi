import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"

export default function BetterLink({ href, children, as }) {
  return (
    <Link href={href} as={as}>
      {children}
    </Link>
  )
}
