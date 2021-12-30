import { VerificationRules } from "@/components/discover/verification-rules"
import "react-notion-x/src/styles.css"
import { WithNavbar } from "@/components/navbar"
import { LargeBanner } from "@/components/large-banner"
import { VStack } from "@chakra-ui/react"
import { NotionAPI } from "notion-client"
import React from "react"

export default function RulesPage({ blockMap }) {
  return (
    <WithNavbar>
      <LargeBanner
        url={`${process.env.NEXT_PUBLIC_BASE_URL_CDN}/fKgpCdJxphzlsWqy.webp`}
        height={["14vh", "20vh", "20vh"]}
        objectPosition="50% 24%"
      />
      <VStack mx="auto" maxW="6xl" w="full" color="white">
        <VerificationRules blockMap={blockMap} />
      </VStack>
    </WithNavbar>
  )
}
const notion = new NotionAPI()

export const getStaticProps = async () => {
  const blockMap = await notion.getPage("beeb47c765d14108b1d5fb25108cf56d")
  return {
    props: {
      blockMap,
    },
    revalidate: 30,
  }
}
