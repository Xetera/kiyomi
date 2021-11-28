import { UserDataFragment } from "@/lib/__generated__/graphql"
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
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react"
import { useRouter } from "next/router"
import { RiStackLine } from "react-icons/ri"

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
  const btnRef = useRef(null)

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
        py={3}
        mx="auto"
        flex={1}
      >
        <Box>
          <HStack spacing={3} display={["none", null, "flex"]}>
            <NavLink href="/">Home</NavLink>
            <NavLink href="/discover">Discover</NavLink>
            <NavLink href="/api/graphql" hardLink>
              API
            </NavLink>
          </HStack>
        </Box>
        <Flex display={["flex", null, "none"]}>
          <Button onClick={onOpen}>
            <RiStackLine />
          </Button>
        </Flex>
        <HStack spacing={3} display={["none", null, "flex"]}>
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
                <NavLink href="/api/graphql" w="full" hardLink>
                  API
                </NavLink>
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
                <></>
              )}
            </VStack>
            {/*<Button variant="outline" mr={3} onClick={onClose}>*/}
            {/*  Cancel*/}
            {/*</Button>*/}
            {/*<Button colorScheme="blue">Save</Button>*/}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
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
