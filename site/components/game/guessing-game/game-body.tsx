import { useSelector } from "@/hooks/useSelector"
import { Flex, forwardRef, Text, VStack } from "@chakra-ui/react"
import React from "react"
import { GameSearch } from "@/components/game/guessing-game/game-search"
import { GameRevealedAnswer } from "@/components/game/guessing-game/game-revealed-answer"
import { ClientSeat, RevealedAnswerVote } from "../../../../shared/game"
import partition from "lodash/partition"
import { GameRevealedAnswerUserProps } from "@/components/game/guessing-game/game-revealed-answer-person"

const Answers = forwardRef((props, ref) => {
  const { ...rest } = props
  const round = useSelector((root) => root.game?.round)
  const seats = useSelector((root) => root.game?.room?.seats)

  // we shouldn't be hitting that here but still need to check
  if (round?.state.type !== "waitingForNextRound") {
    return null
  }

  const [correctGuesses, incorrectGuesses] = partition(
    round.state.answers,
    (answer) => {
      // ugh
      if (round?.state.type !== "waitingForNextRound") {
        return false
      }
      return answer.person.id === round.state.correctAnswer.id
    }
  )
  const { correctAnswer } = round.state

  function getUsers(
    answers: RevealedAnswerVote[]
  ): GameRevealedAnswerUserProps[] {
    return answers.reduce((all, user) => {
      const seat = seats?.find((seat) => seat.player.id === user.userId)
      if (!seat) {
        return all
      }
      all.push({
        avatar: seat.player.imageUrl,
        name: seat.player.username,
        hintUsed: user.usedHint,
      })
      return all
    }, [] as GameRevealedAnswerUserProps[])
  }

  return (
    <VStack {...rest} ref={ref} spacing={8}>
      <VStack spacing={4}>
        <Text textStyle="heading">Correct Answer</Text>
        <GameRevealedAnswer
          name={correctAnswer.name}
          aliases={correctAnswer.aliases}
          personId={correctAnswer.id}
          avatar={correctAnswer.image}
          isCorrect
          preferredGroupName={correctAnswer.preferredGroupName}
          people={getUsers(
            correctGuesses
              .filter((guess) => guess.person.id === correctAnswer.id)
              .flatMap((guess) => guess.users)
          )}
        />
      </VStack>
      {incorrectGuesses.length > 0 ? (
        <VStack>
          <Text textStyle="heading">Incorrect Guesses</Text>
          <VStack spacing={4}>
            {incorrectGuesses.map((answer) => {
              const players = getUsers(answer.users)
              const { person } = answer
              return (
                <GameRevealedAnswer
                  avatar={person.image}
                  personId={person.id}
                  name={person.name}
                  aliases={person.aliases}
                  preferredGroupName={person.preferredGroupName}
                  preferredAlias={person.preferredAlias}
                  people={players}
                  key={answer.person.id}
                />
              )
            })}
          </VStack>
        </VStack>
      ) : null}
    </VStack>
  )
})

export const GameBody = () => {
  const hintedGroupName = useSelector((root) => root.game?.hintedGroupName)
  const round = useSelector((root) => root.game?.round)
  const seats = useSelector((root) => root.game?.room?.seats)
  const answers = useSelector((root) => root.game?.answers)

  return (
    <Flex position="relative" height="min-content" flex={1} p={6} w="full">
      {round?.state.type === "waitingForNextRound" ? (
        <Answers />
      ) : (
        <VStack spacing={2} w="full">
          {hintedGroupName && <Text color="yellow.300">{hintedGroupName}</Text>}
          <Text textStyle="heading-sm">Answer Now!</Text>
          <GameSearch mb={4} flex={1} />
        </VStack>
      )}
    </Flex>
  )
}
