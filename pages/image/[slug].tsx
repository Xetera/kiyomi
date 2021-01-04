import React from "react";
import { prisma } from "@/lib/db";
import { fetcher, useGet } from "@/lib/utils/shared";
import { GetServerSideProps } from "next";
import ImageDisplay from "@/components/image-display";
import ImageSidebar from "@/components/image-sidebar";
import { FaceContext, ImageContext } from "@/models/contexts";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { FaUserLock } from "react-icons/fa";
import { RiSpyLine } from "react-icons/ri";
import type { ImageResponse } from "../api/image/[slug]";
import useSWR from "swr";

const imageUrl = (slug: string) => `/api/image/${slug}`;

export default function Image({ images, slug }) {
  const [face, setFace] = React.useState(-1);
  const { data } = useSWR<ImageResponse>(imageUrl(slug), fetcher, {
    initialData: images,
  });
  return (
    <FaceContext.Provider value={{ face, setFace }}>
      <ImageContext.Provider value={data}>
        <Navbar />
        {!data.public && (
          <div className="mb-4 rounded border-b-1 border-theme-light bg-theme-alt text-sm lg:text-base">
            <div className="max-w-7xl mx-auto py-3 px-4 flex items-center font-semibold text-blueGray-400">
              <RiSpyLine className="mr-2" />
              This image is unlisted and can only be viewed with a link.
            </div>
          </div>
        )}
        <div className="justify-center mx-auto max-w-7xl px-4 lg:my-24 my-4">
          <article className="flex gap-8 justify-center md:flex-row flex-col">
            <div className="flex">
              {data.caption && (
                <h1 className="text-2xl font-black mb-2 text-blueGray-500">
                  {data.caption}
                </h1>
              )}
              <ImageDisplay />
            </div>
            <div
              style={{ height: "min-content", minWidth: "250px" }}
              className="overflow-hidden"
            >
              <ImageSidebar image={data} />
            </div>
          </article>
        </div>
        <Footer />
      </ImageContext.Provider>
    </FaceContext.Provider>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  res,
  params,
}) => {
  const { slug } = params;
  if (Array.isArray(slug)) {
    return {
      notFound: true,
    };
  }
  const images = await fetcher(imageUrl(slug as string));
  // asynchronously increment view done in
  // getServerSideProps to prevent triggering
  // view climb from useSWR
  prisma.image
    .update({
      where: { slug },
      data: {
        views: {
          increment: 1,
        },
      },
    })
    .catch((err) => {
      console.log("something went wrong while incrementing views", err);
    });
  return {
    props: {
      images,
      slug,
    },
  };
};
