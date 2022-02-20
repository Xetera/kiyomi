import { HStack, Link, Tag, Text } from "@chakra-ui/react"
import { HiBadgeCheck } from "react-icons/hi"

export type ProviderTagProps = {
  defaultName?: string | null
  official: boolean
  href?: string
}

export const ProviderTag = (pr: ProviderTagProps) => {
  const component = (
    <Tag mr={2} mb={2}>
      <HStack spacing={1}>
        <Text>{pr.defaultName ?? "Unknown"}</Text>
        {pr.official && <HiBadgeCheck title="Official source" />}
      </HStack>
    </Tag>
  )
  if (pr.href) {
    return (
      <Link href={pr.href} target="_blank">
        {component}
      </Link>
    )
  }
  return component
}
