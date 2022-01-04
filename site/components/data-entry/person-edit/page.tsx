import {
  Button,
  Text,
  HStack,
  Input,
  VStack,
  RadioGroup,
  Radio,
  Link,
  Box,
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
import { Portrait } from "@/components/portrait"
import { personPortraitDimensions } from "@/components/person/page"
import { useEffect } from "react"

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
  const { register, handleSubmit, control, reset, getValues } = useForm({
    defaultValues: {
      name: person.name,
      birthDate: person.birthDate,
      aliases: person.aliases,
      preferredAliasId: person.preferredAlias?.id ?? -1,
      avatarId: person.avatar?.id,
      bannerId: person.banner?.id,
    },
  })

  useEffect(() => {
    console.log(getValues())
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
        birthDate: data.birthDate,
        preferredMembershipId: person.preferredMembership?.id,
        preferredAliasId:
          data.preferredAliasId === -1 ? null : data.preferredAliasId,
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
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
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
        <Portrait
          {...personPortraitDimensions}
          src={person.avatar?.thumbnail.small}
          opacity={1}
        />
        <Field name="Full Name">
          <Input type="text" placeholder="Full name" {...register("name")} />
        </Field>
        <Field name="Birth Date">
          <Input
            type="date"
            {...register("birthDate", { valueAsDate: true })}
          />
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
                  <HStack>
                    <Radio value={-1}>No preferred alias</Radio>
                  </HStack>
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
    </Box>
  )
}
