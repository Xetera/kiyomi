import {
  Modal,
  ModalBody,
  ModalContent,
  ModalContentProps,
  ModalOverlay,
  ModalProps,
} from "@chakra-ui/react"
import React, { PropsWithChildren } from "react"

export const GenericModal = (
  p: PropsWithChildren<ModalProps & { modalContentProps?: ModalContentProps }>
) => {
  const { children, modalContentProps, ...props } = p
  return (
    <Modal {...props} closeOnEsc closeOnOverlayClick>
      <ModalOverlay />
      <ModalContent
        maxW="8xl"
        bg="inherit"
        boxShadow="none"
        minH="80vh"
        {...modalContentProps}
      >
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </Modal>
  )
}
