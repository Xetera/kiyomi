import { VStack, Text } from "@chakra-ui/react"
import { LoaderFunction } from "remix"
import { ContentBox } from "~/components/content-box"

// export const loader: LoaderFunction = ({ request }) => {
//   return
// }

export default function A() {
  // const loaderData = () =. {}
  return (
    <VStack gap={2} w="full">
      <ContentBox>
        <Text>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has
        </Text>
      </ContentBox>
      <ContentBox title="Timeline">Thing</ContentBox>
    </VStack>
  )
}
