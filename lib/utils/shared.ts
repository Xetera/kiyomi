import useSWR, { ConfigInterface } from "swr";

/**
 * Format bytes as human-readable text.
 *
 * @param bytes Number of bytes.
 * @param dp Number of decimal places to display.
 *
 * @return Formatted string.
 */
export function humanFileSize(bytes: number, dp = 1) {
  const thresh = 1000;

  if (Math.abs(bytes) < thresh) {
    return bytes + " B";
  }

  const units = ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  let u = -1;
  const r = 10 ** dp;

  do {
    bytes /= thresh;
    ++u;
  } while (
    Math.round(Math.abs(bytes) * r) / r >= thresh &&
    u < units.length - 1
  );

  return bytes.toFixed(dp) + " " + units[u];
}

export function fetcher(url: string, init?: RequestInit) {
  return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`, init).then((r) =>
    r.json()
  );
}

export function useGet<T, K>(url: string, config: ConfigInterface<T, K>) {
  return useSWR(url, fetcher, config);
}
