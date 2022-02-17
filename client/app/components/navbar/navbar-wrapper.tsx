import {
  useDisclosure,
  Tag,
  Spinner,
  HStack,
  Flex,
  Box,
  Button,
  Link as ChakraLink,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  VStack,
  forwardRef,
  DrawerFooter,
} from "@chakra-ui/react"
import { useRef, PropsWithChildren } from "react"
import { NavLink } from "remix"
import { RiSearchLine, RiStackLine } from "react-icons/ri"

const NavbarLink = forwardRef(
  (
    { children, href, as = undefined, ...rest }: PropsWithChildren<any>,
    ref
  ) => {
    const Component = ({ children, active }: any) => (
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
      >
        {children}
      </Flex>
    )
    return (
      <ChakraLink
        as={NavLink}
        _hover={{ textDecoration: "none" }}
        to={href}
        {...rest}
        ref={ref}
      >
        {({ isActive }: any) => (
          <Component active={isActive}>{children}</Component>
        )}
      </ChakraLink>
    )
  }
)

const activeBg = "rgba(0, 0, 0, 0.3)"

const hoverBackground = { bg: activeBg }
const navSpacing = {
  py: 2,
  px: 6,
}

export const Navbar = forwardRef(({ ...rest }, ref) => {
  const { isOpen, onClose, onOpen } = useDisclosure()
  // const { data } = useUserNotificationsQuery()
  const btnRef = useRef(null)
  // const user = useSelector((root: RootState) => root.user)

  // function logout() {
  //   signOut()
  // }

  // function openSearch() {
  //   store.dispatch.search.toggleSearch()
  // }

  // const discord = (
  //   <NavLink href={DISCORD_INVITE_URL}>
  //     Discord
  //   </NavLink>
  // )

  // const moderation = (
  //   <NavLink href="/moderation" w="full">
  //     Moderate{" "}
  //     {data ? (
  //       data.notifications.unreadReports &&
  //       data.notifications.unreadReports > 0 ? (
  //         <Tag size="sm" ml={2} lineHeight="1">
  //           {data.notifications.unreadReports}
  //         </Tag>
  //       ) : null
  //     ) : (
  //       <Spinner size="xs" />
  //     )}
  //   </NavLink>
  // )

  // const isModerator = hasRole(user.cache?.roles ?? [], Role.Moderator)
  return (
    <HStack
      as="nav"
      height={16}
      position="absolute"
      zIndex={10}
      alignItems="center"
      mx="auto"
      w="full"
      borderBottomWidth="1px"
      borderColor="borderSubtle"
      {...rest}
      ref={ref}
    >
      <Flex
        justify="space-between"
        maxW="7xl"
        alignItems="center"
        px={4}
        py={3}
        mx="auto"
        flex={1}
      >
        <Box>
          <HStack spacing={3} display={["none", null, null, "flex"]}>
            <NavbarLink href="/">Home</NavbarLink>
            <NavbarLink href="/browse">Browse</NavbarLink>
            <NavbarLink href="/discover">Discover</NavbarLink>
            {/* {isModerator && moderation} */}
            <NavbarLink href="/games">Games</NavbarLink>
            {/* {discord} */}
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
            // onClick={openSearch}
            cursor="pointer"
            borderRadius="md"
            spacing={4}
            p={2}
            _hover={hoverBackground}
            {...navSpacing}
          >
            <RiSearchLine />
          </HStack>
          {/* {session?.user ? (
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
          )} */}
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
                <NavbarLink href="/" w="full">
                  Home
                </NavbarLink>
                <NavbarLink href="/discover" w="full">
                  Discover
                </NavbarLink>
                {/* {isModerator && moderation} */}
                <NavbarLink href="/games" w="full">
                  Games
                </NavbarLink>
                {/* {discord} */}
              </VStack>
            </VStack>
          </DrawerBody>

          <DrawerFooter>
            <VStack spacing={4} w="full" align="flex-start">
              {/* session?.user ? (
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
              ) */}
            </VStack>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </HStack>
  )
})

export function WithNavbar(props: PropsWithChildren<{ noSpace?: boolean }>) {
  return (
    <Flex w="full" h="full" flex="1">
      <Navbar borderBottomWidth={props.noSpace ? "0px" : "1px"} />
      <Flex w="full" pt={props.noSpace ? 0 : 16} alignItems="flex-start">
        {props.children}
      </Flex>
    </Flex>
  )
}
