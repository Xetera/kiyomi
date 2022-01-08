import { createModel } from "@rematch/core"
import type { RootModel } from "."
import {
  buildAugmentedResults,
  ClientPerson,
  ClientRoom,
  ClientRoomPreview,
  ClientRound,
  ClientSearchGroup,
  ClientSearchPerson,
  ClientSeat,
  MeiliResult,
  OutgoingMessage,
  PartialSearchResult,
  PersonPool,
  UserAnswerPayload,
} from "../../../shared/game"
import Router from "next/router"
import { createStandaloneToast } from "@chakra-ui/react"
import debounce from "lodash/debounce"
import keyBy from "lodash/keyBy"
import { store } from "@/models/store"

const defaultOptions = { position: "bottom-right" } as const

const emitInfo = createStandaloneToast({
  colorMode: "dark",
  defaultOptions: { ...defaultOptions, status: "info" },
})

const emitError = createStandaloneToast({
  colorMode: "dark",
  defaultOptions: { ...defaultOptions, status: "error" },
})

export type GameState = {
  connected: boolean
  startDate?: number
  countingDown?: boolean
  personHintResults: ClientSearchPerson[]
  personHintSearching: boolean
  answers?: UserAnswerPayload
  groups: ClientSearchGroup[]
  lobbySearchQuery: string
  searchingGroup: boolean
  loadingImageCount: boolean
  round?: ClientRound
  waitingForNextRound: boolean
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
    waitingForNextRound: false,
    personHintSearching: false,
    loadingImageCount: false,
    auditLog: [],
    personHintResults: [],
    connected: false,
    selectedPeople: [],
    lobbySearchQuery: "",
    searchResult: [],
    currentSelection: {},
    groups: [],
    searchingGroup: false,
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
    setImageCount(state, count: number, coordination: number) {
      state.loadingImageCount = false
      if (state.room) {
        state.room.coordination = coordination
        state.room.imagePoolSize = count
      }
      return state
    },
    updateUsers(state, seats: ClientSeat[]) {
      if (!state.room) {
        return state
      }
      state.room.seats = seats
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
    setSearchState(state, searching: boolean) {
      state.searchingGroup = searching
      return state
    },
    setSearch(state, search: string) {
      state.lobbySearchQuery = search
      if (search === "") {
        state.searchResult = []
      }
      return state
    },
    clearRoom(state) {
      state.room = undefined
      return state
    },
    updateRoom(state, room: ClientRoom) {
      if (
        state.room &&
        Object.keys(room.selections) !== Object.keys(state.room.selections) &&
        room.coordination !== state.room.coordination
      ) {
        // We received a new selection of idols, waiting for image count
        state.loadingImageCount = true
      }
      state.room = room
      return state
    },
    startCountdown(state) {
      state.countingDown = true
      return state
    },
    endCountdown(state) {
      state.countingDown = false
      return state
    },
    startGame(state) {
      if (state.room) {
        state.room.started = true
      } else {
        console.warn(`Tried to start a game without being in a room?`)
      }
      return state
    },
    setRound(state, clientRound: ClientRound) {
      state.waitingForNextRound = false
      state.round = clientRound
      return state
    },
    answerReveal(state, payload: UserAnswerPayload) {
      state.waitingForNextRound = true
      state.answers = payload
      return state
    },
    setSearchingPerson(state, searching: boolean) {
      state.personHintSearching = searching
      return state
    },
    setGameSearchHints(state, results: ClientSearchPerson[]) {
      state.personHintResults = results
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
      if (!query) {
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
      dispatch.game.setSearchState(true)
      for await (const { groups, people } of stepSearch(query)) {
        dispatch.game.updateSearchResult(groups, people)
      }
      dispatch.game.setSearchState(false)
    }, 200)

    return {
      async search(query: string) {
        dispatch.game.setSearch(query)
        runSearch(query)
      },
      message(message: OutgoingMessage) {
        console.log("Websocket message", message)
        if (message.t === "error") {
          emitError({
            description: message.message,
          })
        } else if (message.t === "rooms") {
          dispatch.game.roomEvent(message.rooms)
        } else if (message.t === "room_update") {
          dispatch.game.updateRoom(message.room)
        } else if (message.t === "created_room") {
          dispatch.game.updateRoom(message.room)
          Router.push(`/games/room/${message.room.slug}`)
        } else if (message.t === "users_update") {
          dispatch.game.updateUsers(message.seats)
        } else if (message.t === "disconnect") {
          dispatch.game.disconnect(message.seat)
        } else if (message.t === "image_counts") {
          dispatch.game.setImageCount(message.count, message.coordinationId)
        } else if (message.t == "starting") {
          dispatch.game.startCountdown()
        } else if (message.t === "started") {
          dispatch.game.startGame()
        } else if (message.t === "round_start") {
          if (message.round.number === 0) {
            dispatch.game.endCountdown()
          }
          dispatch.game.setRound(message.round)
        } else if (message.t === "answers_reveal") {
          dispatch.game.answerReveal(message)
        } else if (message.t === "joined_room") {
          if ("room" in message) {
            dispatch.game.updateRoom(message.room)
          } else if ("error" in message) {
            emitError({
              description: message.error,
            })
            if (Router.basePath !== "/games") {
              Router.push("/games")
            }
          }
        }
      },
      async searchIdol(q: string) {
        if (!q) {
          dispatch.game.setGameSearchHints([])
          return
        }
        dispatch.game.setSearchingPerson(true)
        const people: MeiliResult<ClientSearchPerson> = await fetch(
          url("idols"),
          {
            method: "POST",
            body: JSON.stringify({
              limit: 8,
              q,
            }),
          }
        ).then((r) => r.json())
        dispatch.game.setSearchingPerson(false)
        dispatch.game.setGameSearchHints(people.hits)
      },
      async refreshSearchData() {
        const [groups] = (await Promise.all([
          fetch(
            `${process.env.NEXT_PUBLIC_MEILISEARCH_URL}/indexes/groups/documents?limit=5000`
          ).then((r) => r.json()),
        ])) as [ClientSearchPerson[]]
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
