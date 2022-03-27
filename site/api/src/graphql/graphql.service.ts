import { Injectable } from "@nestjs/common"

export enum Cursor {
  Homepage = "homepage",
  PeopleList = "peopleList",
}

export type BasePrismaCursor = {
  take: number
  cursor?: { id: number }
  skip: number
}

@Injectable()
export class GraphqlService {
  static makeCursor(type: Cursor, id: number) {
    return Buffer.from(`${type}:${id}`).toString("base64")
  }

  static fromCursor(cursor: string): number {
    const [, id] = Buffer.from(cursor, "base64").toString().split(":")
    return Number(id)
  }

  static baseCursor(first: number, after?: number): BasePrismaCursor {
    const opts: BasePrismaCursor = {
      take: first,
      skip: 0,
    }
    if (after !== undefined) {
      opts.cursor = {
        id: after,
      }
      opts.skip = 1
    }
    return opts
  }

  static deriveCursor<T extends { id: number }>(items: T[], type: Cursor) {
    const item = items.at(-1)
    if (!item) {
      return
    }
    return GraphqlService.makeCursor(type, item.id)
  }
}
