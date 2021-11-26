import { UserDataFragment } from "@/lib/__generated__/graphql"
import { signOut, useSession } from "next-auth/client"
import Link from "next/link"
import React, { PropsWithChildren } from "react"
import BetterLink from "./nextjs/link"
import { Box } from "@chakra-ui/layout"
import { Flex, forwardRef, HStack, Text } from "@chakra-ui/react"

type AType = React.AnchorHTMLAttributes<HTMLAnchorElement>
type NavLinkProps = AType & {
  href: string
  as?: string
  hardLink?: boolean
}

const NavbarClickable = forwardRef(({ children, ...props }, ref) => (
  <Flex
    align="center"
    py={2}
    px={6}
    borderRadius="3px"
    fontWeight="600"
    fontSize="14px"
    color="#caccd1"
    transition="all 0.2s ease-in-out"
    cursor="pointer"
    _hover={{
      bg: "rgba(0, 0, 0, 0.3)",
    }}
    ref={ref}
    {...props}
  >
    {children}
  </Flex>
))

function NavLink({
  children,
  href,
  as = undefined,
  hardLink,
  ...rest
}: PropsWithChildren<NavLinkProps>) {
  const aProps: AType = {
    ...rest,
  }

  const component = <NavbarClickable>{children}</NavbarClickable>
  if (hardLink) {
    return <a href={href}>{component}</a>
  }
  const data = (
    <Link href={href} {...aProps}>
      <a>{component}</a>
    </Link>
  )

  if (hardLink) return data
  return (
    <BetterLink href={href} as={as}>
      {data}
    </BetterLink>
  )
}

export type NavbarProps = {
  user?: UserDataFragment
}

export function Navbar() {
  const [session] = useSession()

  function logout() {
    signOut().then(console.log)
  }

  return (
    <HStack
      as="nav"
      position="absolute"
      zIndex={10}
      alignItems="center"
      mx="auto"
      w="full"
    >
      <Flex
        justify="space-between"
        maxW="7xl"
        items="center"
        px={4}
        mx="auto"
        flex={1}
      >
        <HStack spacing={3} py={3}>
          <NavLink href="/">Home</NavLink>
          {/* <NavLink href="/games">Games</NavLink> */}
          <NavLink href="/api/graphql" hardLink>
            API
          </NavLink>
        </HStack>
        <HStack spacing={3}>
          {session?.user ? (
            <>
              <NavLink href="/profile">
                <Text>{session.user.name}</Text>
              </NavLink>
              <NavbarClickable onClick={logout}>
                <Text>Logout</Text>
              </NavbarClickable>
            </>
          ) : (
            <NavLink href="/api/auth/signin">
              <Text>Sign In</Text>
            </NavLink>
          )}
        </HStack>
      </Flex>
    </HStack>
  )
}

export function WithNavbar(props: PropsWithChildren<{ noSpace?: boolean }>) {
  return (
    <Box>
      <Navbar />
      <Box pt={props.noSpace ? 0 : 16}>{props.children}</Box>
    </Box>
  )
}
