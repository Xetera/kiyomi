import NextHead from "next/head"

export type OgImageProps = {
  imageUrl: string
  title: string
  description: string
}

export function OgImage(props: OgImageProps) {
  return (
    <NextHead>
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="description" content={props.description} />
      <meta name="og:title" content={props.title} />
      <meta name="og:description" content={props.description} />
      <meta name="og:type" content="website" />
      <meta property="og:image" content={props.imageUrl} />
      <meta property="og:image:secure" content={props.imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Kiyomi" />
      <meta property="og:image:type" content="image/jpeg" />
    </NextHead>
  )
}
