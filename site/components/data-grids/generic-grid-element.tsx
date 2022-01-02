import {
  Image as ImageData,
  Person,
  Thumbnail,
} from "@/lib/__generated__/graphql"
import NextLink from "next/link"
import {
  Box,
  Flex,
  Image,
  ImageProps,
  Skeleton,
  Text,
  Link,
} from "@chakra-ui/react"
import React, { useEffect, useRef, useState } from "react"
import format from "date-fns/format"
import { AnimatePresence, motion } from "framer-motion"
import { magicGradient } from "@/client/jsx-helpers"

export type FocusableImage = Pick<ImageData, "focus"> &
  Pick<ImageData, "width" | "height">

export type ImageGridElementProps = {
  forceSmall?: boolean
  image: Pick<ImageData, "createdAt" | "id" | "url"> &
    FocusableImage & {
      thumbnail: Pick<Thumbnail, "small">
      appearances?: Array<{
        person: Pick<Person, "name">
      }>
    }
}

const MotionBox = motion(Box)

const toPercentage = (position: number, max: number) =>
  `${Math.floor((position / max) * 100)}%`

export const focusToObjectPosition = (image: FocusableImage) => {
  return `${toPercentage(
    image.focus ? image.focus.x : image.width / 2,
    image.width
  )} ${toPercentage(
    image.focus ? image.focus.y : image.height / 2,
    image.height
  )}`
}

export type ImageDisplayProps = {
  src: string
  focus?: FocusableImage
}

export const ImageLoader = ({
  focus,
  src: srcDefault,
  ...rest
}: ImageDisplayProps & ImageProps) => {
  const [loaded, setLoaded] = useState(false)
  const [src, setSrc] = useState(srcDefault)
  const [errored, setErrored] = useState(false)
  const ref = useRef<HTMLImageElement | null>(null)
  const objectPosition = focus ? focusToObjectPosition(focus) : ""
  useEffect(() => {
    if (ref.current?.complete) {
      setLoaded(true)
    }
  }, [])

  function onError(err: any) {
    console.log(src, srcDefault)
    console.log(err)
    // making sure we don't recursively call the same error handler if the fallback value errors
    if (ref.current) {
      ref.current.onerror = () => {}
    }
    setErrored(true)
  }

  return (
    <Skeleton
      isLoaded={loaded}
      overflow="hidden"
      height="100%"
      startColor="bgPrimary"
      endColor="bgSecondary"
      w="full"
      background="black"
    >
      {!errored && (
        <Image
          objectPosition={objectPosition}
          objectFit="cover"
          width="100%"
          height="100%"
          loading="lazy"
          onError={onError}
          onLoad={() => setLoaded(true)}
          ref={ref}
          {...rest}
          src={src}
        />
      )}
    </Skeleton>
  )
}

export type GenericGridElement = {
  href: string
  src: string
  focus?: FocusableImage
  bottom?: React.ReactElement
}

export function GenericGridElement(
  props: GenericGridElement /* ImageGridElementProps */
) {
  const [hovering, setHovering] = useState(false)
  const { focus, bottom, src, href } = props

  return (
    <NextLink href={href} passHref>
      <Link
        onMouseOver={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        height="100%"
        w="full"
        flexDirection="column"
        objectFit="cover"
        background="gray.900"
        borderRadius="md"
        position="relative"
        overflow="hidden"
      >
        <ImageLoader focus={focus} src={src} />
        {bottom && (
          <AnimatePresence>
            {hovering && (
              <MotionBox
                initial={{ "--opacity": 0.1 }}
                exit={{ "--gradient": 0.1 }}
                animate={{ "--gradient": 0.8 }}
                transition="all"
                transitionDuration="0.04s"
                display="flex"
                background="linear-gradient(to bottom, transparent, rgba(0, 0, 0, var(--gradient)))"
                sx={{
                  "--gradient": 0.1,
                }}
                justifyContent="space-between"
                p={2}
                position="absolute"
                bottom="0"
                left="0"
                right="0"
                height="20%"
                flexDirection="row"
                alignItems="flex-end"
              >
                {bottom}
              </MotionBox>
            )}
          </AnimatePresence>
        )}
      </Link>
    </NextLink>
  )
}
