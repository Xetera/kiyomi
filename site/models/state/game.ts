import { createModel } from "@rematch/core"
import type { RootModel } from "."
import {
  buildAugmentedResults,
  ClientPerson,
  ClientRoom,
  ClientRoomPreview,
  ClientSearchGroup,
  ClientSearchPerson,
  ClientSeat,
  MeiliResult,
  OutgoingMessage,
  PartialSearchResult,
  PersonPool,
} from "../../../shared/game"
import Router from "next/router"
import { createStandaloneToast } from "@chakra-ui/react"
import { debounce, keyBy } from "lodash"

const emitError = createStandaloneToast({
  colorMode: "dark",
  defaultOptions: { position: "bottom-right", status: "error" },
})

export type GameState = {
  connected: boolean
  groups: ClientSearchGroup[]
  groupSearch: string
  searchResult: Record<number, PartialSearchResult>
  // people: Record<number | string, ClientSearchPerson>
  // some events require waiting for a response after connection
  // so we want to make sure we've waited enough before reacting
  // to a lack of response
  waitedForInitialEvents: boolean
  auditLog: string[]
  rooms: ClientRoomPreview[]
  room?: ClientRoom
}

function buildSearchResult(
  groups: ClientSearchGroup[],
  members?: ClientSearchPerson[]
): Record<number, PartialSearchResult> {
  const out: Record<number, PartialSearchResult> = {}
  for (const group of groups) {
    const filtered = members?.filter((member) =>
      member.groups.includes(group.id)
    )
    out[group.id] = {
      group,
      members: filtered,
    }
  }
  return out
}
export const gameModel = createModel<RootModel>()({
  name: "game",
  state: {
    waitedForInitialEvents: false,
    auditLog: [],
    connected: false,
    selectedPeople: [],
    groupSearch: "",
    searchResult: [],
    currentSelection: {},
    groups: [],
    rooms: [],
    groupSearchResults: [],
  } as GameState,
  reducers: {
    connectionTimePassed(state) {
      state.waitedForInitialEvents = true
      return state
    },
    connect(state) {
      state.connected = true
      return state
    },
    roomEvent(state, rooms: ClientRoomPreview[]) {
      state.rooms = rooms
      // by the time we get the room event we know we're in communication with the server
      state.waitedForInitialEvents = true
      return state
    },
    disconnect(state, seat: ClientSeat) {
      if (state.room) {
        delete state.room.seats[seat.player.id]
      }
      state.auditLog.push(`${seat.player.username} disconnected`)
      return state
    },
    updateUsers(state, seats: ClientSeat[]) {
      if (!state.room) {
        return state
      }
      state.room.seats = keyBy(seats, (seat) => seat.player.id)
      return state
    },
    updateSearchData(state, groups: ClientSearchGroup[]) {
      state.groups = groups
      return state
    },
    updateSearchResult(
      state,
      groups: ClientSearchGroup[],
      members?: ClientSearchPerson[]
    ) {
      state.searchResult = buildSearchResult(groups, members)
      return state
    },
    setSearch(state, search: string) {
      state.groupSearch = search
      return state
    },
    clearRoom(state) {
      state.room = undefined
      return state
    },
    updateRoom(state, room: ClientRoom) {
      state.room = room
      return state
    },
  },
  effects(dispatch) {
    const url = (type: string) =>
      new URL(
        `/indexes/${type}/search`,
        process.env.NEXT_PUBLIC_MEILISEARCH_URL
      ).href
    async function* stepSearch(query: string) {
      if (query === "") {
        return
      }
      const groups: MeiliResult<ClientSearchPerson> = await fetch(
        url("groups"),
        {
          method: "POST",
          body: JSON.stringify({ limit: 5000, q: encodeURIComponent(query) }),
        }
      ).then((r) => r.json())

      yield { groups: groups.hits }
      const idols: MeiliResult<ClientSearchPerson> = await fetch(url("idols"), {
        method: "POST",
        body: JSON.stringify({
          limit: 5000,
          filters: groups.hits.map((hit) => `groups = ${hit.id}`).join(" OR "),
        }),
      }).then((r) => r.json())

      yield { groups: groups.hits, people: idols.hits }
    }
    const runSearch = debounce(async (query: string) => {
      for await (const { groups, people } of stepSearch(query)) {
        dispatch.game.updateSearchResult(groups, people)
      }
    }, 200)

    return {
      async search(query: string, state) {
        dispatch.game.setSearch(query)
        runSearch(query)
      },
      message(message: OutgoingMessage, state) {
        console.log("Websocket message", message)
        if (message.t === "error") {
          emitError({
            description: message.message,
          })
        }
        if (message.t === "rooms") {
          dispatch.game.roomEvent(message.rooms)
        }
        if (message.t === "room_update") {
          dispatch.game.updateRoom(message.room)
        }
        if (message.t === "created_room") {
          dispatch.game.updateRoom(message.room)
          Router.push(`/games/room/${message.room.slug}`)
        }
        if (message.t === "users_update") {
          dispatch.game.updateUsers(message.seats)
        }
        if (message.t === "disconnect") {
          dispatch.game.disconnect(message.seat)
        }
        // if (message.t === "")
        if (message.t === "joined_room") {
          if ("room" in message) {
            dispatch.game.updateRoom(message.room)
          } else if ("error" in message) {
            emitError({
              description: message.error,
            })
            Router.push("/games")
          }
        }
      },
      async refreshSearchData() {
        const [groups] = (await Promise.all([
          // fetch(
          //   `${process.env.NEXT_PUBLIC_MEILISEARCH_URL}/indexes/idols/documents?limit=5000`
          // ).then((r) => r.json()),
          fetch(
            `${process.env.NEXT_PUBLIC_MEILISEARCH_URL}/indexes/groups/documents?limit=5000`
          ).then((r) => r.json()),
        ])) as [
          // ClientSearchPerson[],
          ClientSearchPerson[]
        ]
        dispatch.game.updateSearchData(groups)
      },
      connectionChange(connected: boolean, state) {
        dispatch.game.connect()
        if (connected) {
          setTimeout(() => {
            dispatch.game.connectionTimePassed()
          }, 2000)
        }
        return state
      },
    }
  },
})
