import { createModel } from "@rematch/core"
import type { RootModel } from "."
import type {
  ClientRoom,
  ClientRoomPreview,
  ClientRound,
  ClientSearchGroup,
  ClientSeat,
  OutgoingMessage,
  PartialSearchResult,
  RevealedAnswer,
  UserAnswerPayload,
} from "../../../../shared/game"
// import Router from "next/router"
import { createStandaloneToast } from "@chakra-ui/react"
import debounce from "lodash/debounce"
import { SearchGroup, searchGroup, typesense } from "~/client/typesense"
import { SearchResponseHit } from "typesense/lib/Typesense/Documents"
import {
  getPeopleByGroupId,
  IndexedPerson,
  searchIdol,
} from "../../../../shared/search"
import add from "date-fns/add"

const defaultOptions = { position: "bottom-right", isClosable: true } as const

const emitInfo = createStandaloneToast({
  colorMode: "dark",
  defaultOptions: { ...defaultOptions, status: "info" },
})

const emitError = createStandaloneToast({
  colorMode: "dark",
  defaultOptions: { ...defaultOptions, status: "error" },
})

export type GameState = {
  // gameState: GameState
  connected: boolean
  roundBoundaries?: {
    startDate: Date
    endDate: Date
  }
  // startDate?: number
  countingDown?: boolean
  personHintResults: SearchResponseHit<IndexedPerson>[]
  personHintSearching: boolean
  answers?: RevealedAnswer[]
  groups: ClientSearchGroup[]
  lobbySearchQuery: string
  searchingGroup: boolean
  loadingImageCount: boolean
  imageSlug?: string
  round?: ClientRound
  hintedGroupName?: string
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
  groups: SearchResponseHit<SearchGroup>[],
  members?: SearchResponseHit<IndexedPerson>[]
): Record<number, PartialSearchResult> {
  const out: Record<number, PartialSearchResult> = {}
  for (const { document: group } of groups) {
    const filtered = members
      ?.filter((member) => member.document.groups.includes(group.groupId))
      .map((e) => e.document)
    // @ts-ignore
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
      groups: SearchResponseHit<SearchGroup>[],
      members?: SearchResponseHit<IndexedPerson>[]
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
      state.hintedGroupName = undefined
      state.room = undefined
      state.round = undefined
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
        state.room.state.type = "answering"
        state.room.started = true
      } else {
        console.warn(`Tried to start a game without being in a room?`)
      }
      return state
    },
    receiveHint(state, groupName: string) {
      state.hintedGroupName = groupName
      return state
    },
    prepareImage(state, newState: ClientRound) {
      state.round = newState
      return state
    },
    setRound(state, clientRound: ClientRound) {
      const startDate = new Date()
      state.hintedGroupName = undefined
      state.round = clientRound
      state.roundBoundaries = {
        startDate,
        endDate: add(startDate, { seconds: state.room!.secondsPerRound }),
      }
      return state
    },
    answerReveal(state, payload: UserAnswerPayload) {
      if (state.round) {
        state.round.state = payload.room.state
      }
      state.room = payload.room
      state.answers = payload.answers
      return state
    },
    setSearchingPerson(state, searching: boolean) {
      state.personHintSearching = searching
      return state
    },
    setGameSearchHints(state, results: SearchResponseHit<IndexedPerson>[]) {
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
      const groups = await searchGroup(query)

      yield { groups: groups.hits ?? [] }

      const idols = groups.hits
        ? await getPeopleByGroupId(
            typesense,
            groups.hits.map((hit) => hit.document.groupId)
          )
        : { hits: [] }

      yield { groups: groups.hits ?? [], people: idols.hits }
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
        console.log("[received message]", message)
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
          // TODO: FIX
          // Router.push(`/games/room/${message.room.slug}`)
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
          console.log("[new round]", message.round)
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
            // if (Router.basePath !== "/games") {
            // TODO: fix
            // Router.push("/games")
            // }
          }
        } else if (message.t === "hint") {
          if (message.groupName) {
            dispatch.game.receiveHint(message.groupName)
          } else {
            emitError({
              title: "This person has no known group",
              description: "Poke mods in the Discord server about this, sorry",
            })
          }
        } else if (message.t === "image_prepare") {
          dispatch.game.prepareImage(message.round)
        }
      },
      async searchIdol(q: string) {
        if (!q) {
          dispatch.game.setGameSearchHints([])
          return
        }
        dispatch.game.setSearchingPerson(true)
        const results = await searchIdol(typesense)(q)
        dispatch.game.setSearchingPerson(false)
        dispatch.game.setGameSearchHints(results.hits ?? [])
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
