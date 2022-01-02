import { Button, Input, VStack } from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import { OnePersonQuery, useOnePersonQuery } from "@/lib/__generated__/graphql"
import { useMemo } from "react"

export type PersonEditPageProps = {
  person: Exclude<OnePersonQuery["person"], undefined | null>
}

export const PersonEditPage = ({ person }: PersonEditPageProps) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: person.name,
    },
  })

  function onSubmit() {}

  return (
    <VStack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input type="text" placeholder="Full name" {...register("name")} />
        <Button type="submit">Submit</Button>
      </form>
    </VStack>
  )
}
