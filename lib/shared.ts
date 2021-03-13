import { User } from "next-auth";
import useSWR, { ConfigInterface } from "swr";

export type PromiseReturnType<
  T extends (...args) => any
> = ReturnType<T> extends Promise<infer R> ? R : never;

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

export function rgbToHsl(r: number, g: number, b: number) {
  (r /= 255), (g /= 255), (b /= 255);

  var max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  var h,
    s,
    l = (max + min) / 2;

  if (max == min) {
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
  }

  return { h, s, l };
}

export function fetcher(url: string, init?: RequestInit) {
  return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`, {
    credentials: "include",
    ...init,
  }).then((r) => r.json());
}

export function useGet<T, K>(url: string, config: ConfigInterface<T, K>) {
  return useSWR(url, fetcher, config);
}

export const IMAGES_PER_FETCH = 40;

export type ImagesResponse = {
  data: any[];
  cursor: string | null;
};

export type PublicPerson = {
  name: string;
};

export type PublicFace = {
  id: number;
  person?: PublicPerson;
};

export type BackendUser = User & {
  id: number;
  createdAt: Date;
};
