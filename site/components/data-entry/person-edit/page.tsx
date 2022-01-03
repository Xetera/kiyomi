import {
  Button,
  Text,
  HStack,
  Input,
  VStack,
  RadioGroup,
  Radio,
  Link,
} from "@chakra-ui/react"
import { Controller, useFieldArray, useForm } from "react-hook-form"
import NextLink from "next/link"
import {
  OnePersonQuery,
  useOnePersonQuery,
  usePersonEditMutation,
} from "@/lib/__generated__/graphql"
import { RiAddLine, RiArrowLeftLine, RiDeleteBin2Fill } from "react-icons/ri"
import useToast from "@/hooks/useToast"
import { Routing } from "@/client/routing"
import { personPreferredName } from "@/client/data"

export type PersonEditPageProps = {
  person: Exclude<OnePersonQuery["person"], undefined | null>
}

const Field = ({ name, children }) => (
  <VStack>
    <Text textStyle="heading-sm">{name}</Text>
    {children}
  </VStack>
)

export const PersonEditPage = ({ person }: PersonEditPageProps) => {
  const { mutateAsync, isLoading } = usePersonEditMutation()
  const makeToast = useToast("warning")
  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: {
      name: person.name,
      birthDate: person.birthDate,
      aliases: person.aliases,
      preferredAliasId: person.preferredAlias?.id,
    },
  })

  const { fields: aliases, remove, append } = useFieldArray({
    control,
    name: "aliases",
    keyName: "id",
  })

  async function onSubmit(data) {
    const result = await mutateAsync({
      id: person.id,
      input: {
        name: data.name,
        aliases: data.aliases.map((alias) => alias.name),
        avatarId: person.avatar?.id,
        bannerId: person.banner?.id,
        description: "",
        preferredMembershipId: person.preferredMembership?.id,
        preferredAliasId: data.preferredAliasId,
        groups: person.memberOf.map((m) => ({
          id: m.group.id,
          // endDate: m.group.
        })),
        // gender: person.gender
      },
    })
    if (result.updatePerson) {
      makeToast({
        status: "success",
        description: "Saved changes",
      })
      reset(result.updatePerson)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={8} maxW="6xl" mx="auto" w="full" mt={6}>
        <NextLink
          href={Routing.toPerson(person.id, personPreferredName(person))}
          passHref
        >
          <Link display="flex" alignItems="center">
            <RiArrowLeftLine />
            <Text textStyle="heading-sm" ml={2}>
              Back
            </Text>
          </Link>
        </NextLink>
        <Field name="Full Name">
          <Input type="text" placeholder="Full name" {...register("name")} />
        </Field>
        <Field name="Birth Date">
          <Input type="date" {...register("birthDate")} />
        </Field>
        <Field name="Aliases">
          <Controller
            control={control}
            name="preferredAliasId"
            render={({ field }) => (
              <RadioGroup
                value={field.value}
                onChange={(val) => {
                  const num = Number(val)
                  if (Number.isNaN(num)) {
                    makeToast({
                      description:
                        "You must submit changes before marking new aliases as preferred.",
                    })
                    return
                  }
                  field.onChange(num)
                }}
                spacing={4}
                name="preferredAliasId"
              >
                <VStack spacing={4}>
                  {aliases.map((alias, index) => (
                    <HStack key={alias.id}>
                      <Radio
                        value={alias.id}
                        disabled={Number.isNaN(Number(alias.id))}
                      >
                        Preferred
                      </Radio>
                      <Input {...register(`aliases.${index}.name` as const)} />
                      <RiDeleteBin2Fill onClick={() => remove(index)} />
                    </HStack>
                  ))}
                </VStack>
              </RadioGroup>
            )}
          />
          <HStack>
            <RiAddLine onClick={() => append({ name: "" })} />
          </HStack>
        </Field>
        <Button type="submit" isLoading={isLoading}>
          Submit
        </Button>
      </VStack>
    </form>
  )
}
