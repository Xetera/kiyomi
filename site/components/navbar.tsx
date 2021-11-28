import { UserDataFragment } from "@/lib/__generated__/graphql"
import { signOut, useSession } from "next-auth/client"
import NextLink from "next/link"
import React, { PropsWithChildren } from "react"
import BetterLink from "./nextjs/link"
import { Box } from "@chakra-ui/layout"
import { Flex, forwardRef, HStack, Text, Link } from "@chakra-ui/react"
import { useRouter } from "next/router"

type AType = React.AnchorHTMLAttributes<HTMLAnchorElement>
type NavLinkProps = AType & {
  href: string
  as?: string
  hardLink?: boolean
}

const NavbarClickable = forwardRef(({ children, active, ...props }, ref) => {
  const activeBg = "rgba(0, 0, 0, 0.3)"
  return (
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
      bg={active ? activeBg : "inherit"}
      _hover={{
        bg: activeBg,
      }}
      ref={ref}
      {...props}
    >
      {children}
    </Flex>
  )
})

function NavLink({
  children,
  href,
  as = undefined,
  hardLink,
  ...rest
}: PropsWithChildren<NavLinkProps>) {
  const router = useRouter()

  const isSelected = router.pathname === href

  const aProps: AType = {
    ...rest,
  }

  const component = (
    <NavbarClickable active={isSelected}>{children}</NavbarClickable>
  )
  if (hardLink) {
    return <a href={href}>{component}</a>
  }
  const data = (
    <NextLink href={href} {...aProps} passHref>
      <Link _hover={{ textDecoration: "none" }}>{component}</Link>
    </NextLink>
  )

  if (hardLink) return data
  return (
    <NextLink href={href} as={as}>
      {data}
    </NextLink>
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
          <NavLink href="/discover">Discover</NavLink>
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
