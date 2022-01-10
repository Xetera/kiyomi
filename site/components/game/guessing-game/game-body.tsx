import { useSelector } from "@/hooks/useSelector"
import { Flex, VStack } from "@chakra-ui/react"
import React from "react"
import { GameSearch } from "@/components/game/guessing-game/game-search"
import { GameRevealedAnswer } from "@/components/game/guessing-game/game-revealed-answer"
import { ClientSeat } from "../../../../shared/game"

const Answers = () => {
  const round = useSelector((root) => root.game?.round)
  const seats = useSelector((root) => root.game?.room?.seats)

  // we shouldn't be hitting that here but still need to check
  if (round?.state.type !== "waitingForNextRound") {
    return null
  }

  const someoneGuessedRight = round.state.answers.some((answer) => {
    // ugh
    if (round?.state.type !== "waitingForNextRound") {
      return false
    }
    return answer.person.id === round.state.correctAnswer.id
  })
  const { correctAnswer } = round.state
  return (
    <VStack>
      {!someoneGuessedRight && (
        <GameRevealedAnswer
          name={correctAnswer.name}
          aliases={correctAnswer.aliases}
          people={[]}
        />
      )}
      {round.state.answers.map((answer) => {
        const players = answer.users
          .map((user) => seats?.find((seat) => seat.player.id === user))
          .filter(Boolean) as ClientSeat[]
        const { person } = answer
        return (
          <GameRevealedAnswer
            avatar={person.image}
            name={person.name}
            aliases={person.aliases}
            people={players.map((p) => ({
              avatar: p.player.imageUrl,
              name: p.player.username,
            }))}
            key={answer.person.id}
          />
        )
      })}
    </VStack>
  )
}

export const GameBody = () => {
  const round = useSelector((root) => root.game?.round)
  const seats = useSelector((root) => root.game?.room?.seats)
  const answers = useSelector((root) => root.game?.answers)

  return (
    <Flex position="relative" height="min-content" flex={1}>
      {round?.state.type === "waitingForNextRound" ? (
        <Answers />
      ) : (
        <GameSearch mb={4} flex={1} />
      )}
    </Flex>
  )
}
