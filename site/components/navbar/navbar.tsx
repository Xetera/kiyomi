import {
  UserDataFragment,
  useUserNotificationsQuery,
} from "@/lib/__generated__/graphql"
import { signOut, useSession } from "next-auth/client"
import NextLink from "next/link"
import React, { PropsWithChildren, useRef } from "react"
import { Box } from "@chakra-ui/layout"
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  forwardRef,
  HStack,
  Link,
  Spinner,
  Tag,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react"
import { useRouter } from "next/router"
import { RiSearchLine, RiStackLine } from "react-icons/ri"
import { RootState, store } from "@/models/store"
import { DISCORD_INVITE_URL } from "@/client/constants"
import { useSelector } from "react-redux"
import { hasRole, Role } from "@/lib/permissions"

type AType = React.AnchorHTMLAttributes<HTMLAnchorElement>
type NavLinkProps = AType & {
  href: string
  as?: string
  hardLink?: boolean
}

const activeBg = "rgba(0, 0, 0, 0.3)"
const hoverBackground = { bg: activeBg }
const navSpacing = {
  py: 2,
  px: 6,
}

const NavbarClickable = forwardRef(({ children, active, ...props }, ref) => {
  return (
    <Flex
      align="center"
      {...navSpacing}
      borderRadius="3px"
      fontWeight="600"
      fontSize="14px"
      color="#caccd1"
      transition="all 0.2s ease-in-out"
      cursor="pointer"
      bg={active ? activeBg : "inherit"}
      _hover={hoverBackground}
      ref={ref}
      {...props}
    >
      {children}
    </Flex>
  )
})

const NavLink = forwardRef(
  (
    {
      children,
      href,
      as = undefined,
      hardLink,
      ...rest
    }: PropsWithChildren<NavLinkProps>,
    ref
  ) => {
    const router = useRouter()

    const isSelected = router.pathname === href

    const aProps: AType = {
      ...rest,
    }

    const component = (
      <NavbarClickable active={isSelected}>{children}</NavbarClickable>
    )
    if (hardLink) {
      return (
        <Link
          _hover={{ textDecoration: "none" }}
          href={href}
          {...rest}
          ref={ref}
        >
          {component}
        </Link>
      )
    }
    const data = (
      <NextLink href={href} {...aProps} passHref>
        <Link _hover={{ textDecoration: "none" }} {...rest} ref={ref}>
          {component}
        </Link>
      </NextLink>
    )

    if (hardLink) return data
    return (
      <NextLink href={href} as={as}>
        {data}
      </NextLink>
    )
  }
)

export type NavbarProps = {
  user?: UserDataFragment
}

export function Navbar() {
  const [session] = useSession()
  const { isOpen, onClose, onOpen } = useDisclosure()
  const { data } = useUserNotificationsQuery()
  const btnRef = useRef(null)
  const user = useSelector((root: RootState) => root.user)

  function logout() {
    signOut()
  }

  function openSearch() {
    store.dispatch.search.toggleSearch()
  }

  const discord = (
    <NavLink hardLink href={DISCORD_INVITE_URL}>
      Discord
    </NavLink>
  )

  const moderation = (
    <NavLink href="/moderation" w="full">
      Moderate{" "}
      {data ? (
        data.notifications.unreadReports &&
        data.notifications.unreadReports > 0 ? (
          <Tag size="sm" ml={2} lineHeight="1">
            {data.notifications.unreadReports}
          </Tag>
        ) : null
      ) : (
        <Spinner size="xs" />
      )}
    </NavLink>
  )

  const isModerator = hasRole(user.cache?.roles ?? [], Role.Moderator)
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
        py={3}
        mx="auto"
        flex={1}
      >
        <Box>
          <HStack spacing={3} display={["none", null, null, "flex"]}>
            <NavLink href="/">Home</NavLink>
            <NavLink href="/browse">Browse</NavLink>
            <NavLink href="/discover">Discover</NavLink>
            {isModerator && moderation}
            <NavLink href="/api/graphql" hardLink>
              API
            </NavLink>
            {discord}
          </HStack>
        </Box>
        <Flex display={["flex", null, null, "none"]}>
          <Button onClick={onOpen}>
            <RiStackLine />
          </Button>
        </Flex>
        <HStack spacing={3} display={["none", null, null, "flex"]}>
          <HStack
            align="center"
            onClick={openSearch}
            cursor="pointer"
            borderRadius="md"
            spacing={4}
            p={2}
            _hover={hoverBackground}
            {...navSpacing}
          >
            <RiSearchLine />
          </HStack>
          {session?.user ? (
            <>
              <NavLink href="/profile">
                <Text
                  maxW="25ch"
                  whiteSpace="nowrap"
                  w="full"
                  overflow="hidden"
                  textOverflow="ellipsis"
                >
                  {session.user.name}
                </Text>
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
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent bg="bgPrimary">
          <DrawerCloseButton />
          <DrawerHeader></DrawerHeader>

          <DrawerBody>
            <VStack spacing={8}>
              <VStack spacing={4} w="full" align="flex-start">
                <NavLink href="/" w="full">
                  Home
                </NavLink>
                <NavLink href="/discover" w="full">
                  Discover
                </NavLink>
                {isModerator && moderation}
                <NavLink href="/api/graphql" w="full" hardLink>
                  API
                </NavLink>
                {discord}
              </VStack>
            </VStack>
          </DrawerBody>

          <DrawerFooter>
            <VStack spacing={4} w="full" align="flex-start">
              {session?.user ? (
                <>
                  <NavLink href="/profile" w="full">
                    <Text
                      maxW="25ch"
                      whiteSpace="nowrap"
                      w="full"
                      overflow="hidden"
                      textOverflow="ellipsis"
                    >
                      {session.user.name}
                    </Text>
                  </NavLink>
                  <NavbarClickable onClick={logout} w="full">
                    <Text>Logout</Text>
                  </NavbarClickable>
                </>
              ) : (
                <NavLink href="/api/auth/signin">
                  <Text>Sign In</Text>
                </NavLink>
              )}
            </VStack>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </HStack>
  )
}

export function WithNavbar(props: PropsWithChildren<{ noSpace?: boolean }>) {
  return (
    <Flex w="full" minH="100vh">
      <Navbar />
      <Box w="full" pt={props.noSpace ? 0 : 16}>
        {props.children}
      </Box>
    </Flex>
  )
}
