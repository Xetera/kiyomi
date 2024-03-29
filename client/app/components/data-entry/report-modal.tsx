import { GenericModal } from "~/components/data-entry/generic-modal"
import {
  Text,
  Image,
  Input,
  VStack,
  Button,
  ButtonGroup,
} from "@chakra-ui/react"
import { useContext, useState } from "react"
import useToast from "~/hooks/useToast"
import { useForm } from "react-hook-form"
import { GraphqlClientContext } from "~/models/contexts"

export type ReportModalProps = {
  id: number
  slug: string
  src: string
  isOpen: boolean
  onClose(): void
}

export const ReportModal = ({
  id,
  slug,
  src,
  onClose,
  isOpen,
}: ReportModalProps) => {
  const sdk = useContext(GraphqlClientContext)
  const toast = useToast("error")
  const { handleSubmit, register } = useForm({
    reValidateMode: "onBlur",
    defaultValues: {
      reason: "",
    },
  })
  const onSubmit = handleSubmit(async (data) => {
    try {
      await sdk.ReportImage({
        imageId: id,
        reason: data.reason,
      })
      toast({
        status: "success",
        title: "You reported this image",
        description: "Our moderators will take a look at this shortly",
      })
      onClose()
    } catch (err) {
      if (err instanceof Error) {
        toast({
          title: "Oops!",
          description: err.message,
        })
      }
    }
  })
  return (
    <GenericModal
      isOpen={isOpen}
      onClose={onClose}
      scrollBehavior="inside"
      modalContentProps={{
        bg: "bgPrimary",
        maxW: "2xl",
        p: 4,
      }}
    >
      <form onSubmit={onSubmit}>
        <VStack spacing={8}>
          <Text textStyle="heading">Report</Text>
          <VStack spacing={4}>
            <Text textStyle="heading-sm">You are reporting this image</Text>
            <Image src={src} maxW="full" borderRadius="md" overflow="hidden" />
          </VStack>
          <VStack spacing={4}>
            <Text textStyle="heading-sm">Report Reason?</Text>
            <Input type="text" {...register("reason")} />
          </VStack>
          <ButtonGroup>
            <Button size="sm" type="submit" colorScheme="telegram">
              Submit Report
            </Button>
            <Button size="sm" onClick={onClose}>
              Cancel
            </Button>
          </ButtonGroup>
        </VStack>
      </form>
    </GenericModal>
  )
}
