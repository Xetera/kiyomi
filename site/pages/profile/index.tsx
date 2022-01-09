import { Navbar, WithNavbar } from "@/components/navbar"
import { User } from "@/components/user"
import React from "react"
import { useMeQuery } from "@/lib/__generated__/graphql"
import { GetServerSideProps } from "next"
import { prefetchQuery } from "@/lib/client-helpers"
import ImageGrid from "@/components/data-grids/image-grid"
import { toClickableGridImage } from "@/client/data/image-mappers"

function Image() {
  const { data } = useMeQuery()
  if (!data?.me) {
    return <Navbar />
  }

  return (
    <WithNavbar>
      <div className="flex flex-col w-full mx-auto max-w-7xl px-8">
        <div className="flex justify-content w-full py-10">
          <div>
            <User user={data.me} bottom={<h1>hi</h1>} />
          </div>
        </div>
        <ImageGrid images={data.me.images.map(toClickableGridImage)} />
      </div>
    </WithNavbar>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const dehydratedState = await prefetchQuery("Me", {})
  return {
    props: { dehydratedState },
  }
}

export default Image
