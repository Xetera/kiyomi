import {
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  ModalProps,
} from "@chakra-ui/react"
import React, { PropsWithChildren } from "react"

export const GenericModal = (p: PropsWithChildren<ModalProps>) => {
  const { children, ...props } = p
  return (
    <Modal {...props} closeOnEsc closeOnOverlayClick>
      <ModalOverlay />
      <ModalContent maxW="8xl" bg="inherit" boxShadow="none" minH="80vh">
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </Modal>
  )
}
