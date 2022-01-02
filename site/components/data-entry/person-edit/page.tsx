import { Button, VStack } from "@chakra-ui/react"
import { useForm } from "react-hook-form"

export type PersonEditPageProps = {
  id: number
}

export const PersonEditPage = ({ id }: PersonEditPageProps) => {
  const { register, handleSubmit } = useForm()
  function onSubmit() {}
  return (
    <VStack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Full name" {...register("name")} />
        <Button type="submit">Submit</Button>
      </form>
    </VStack>
  )
}
