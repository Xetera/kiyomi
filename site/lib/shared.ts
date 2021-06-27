import { User } from "next-auth"

export type PromiseReturnType<
  T extends (...args: any[]) => any
> = ReturnType<T> extends Promise<infer R> ? R : never

/**
 * Format bytes as human-readable text.
 *
 * @param bytes Number of bytes.
 * @param dp Number of decimal places to display.
 *
 * @return Formatted string.
 */
export function humanFileSize(bytes: number, dp = 1) {
  const thresh = 1000

  if (Math.abs(bytes) < thresh) {
    return bytes + " B"
  }

  const units = ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
  let u = -1
  const r = 10 ** dp

  do {
    bytes /= thresh
    ++u
  } while (
    Math.round(Math.abs(bytes) * r) / r >= thresh &&
    u < units.length - 1
  )

  return bytes.toFixed(dp) + " " + units[u]
}

export type BackendUser = User & {
  id: number
  createdAt: Date
}
