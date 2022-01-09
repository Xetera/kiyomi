import { useSelector } from "@/hooks/useSelector"
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useInterval,
} from "@chakra-ui/react"
import pick from "lodash/pick"
import add from "date-fns/add"
import React, { useMemo } from "react"
import { Flex } from "@chakra-ui/layout"
import { useCountdown } from "@/hooks/game"

interface GameCountdownParams {
  seconds: number
}

export default function GameCountdown({ seconds: _sec }: GameCountdownParams) {
  const seconds = useCountdown(_sec)
  return (
    <Modal
      isCentered
      onClose={() => {}}
      motionPreset="slideInBottom"
      isOpen={true}
    >
      <ModalOverlay />
      <ModalContent height="200px" background="bgSecondary">
        <ModalBody
          alignItems="center"
          flexDirection="column"
          justifyContent="center"
          height="100%"
          display="flex"
          fontWeight="semibold"
        >
          Game starting
          <ModalHeader>{Math.max(0, seconds)}</ModalHeader>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
