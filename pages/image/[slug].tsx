import React from "react";
import { prisma } from "@/lib/db";
import { fetcher, PromiseReturnType, useGet } from "@/lib/shared";
import { GetServerSideProps } from "next";
import ImageDisplay from "@/components/image-display";
import ImageSidebar from "@/components/image-sidebar";
import { FaceContext, ImageContext } from "@/models/contexts";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import NextHead from "next/head";
import { RiSpyLine } from "react-icons/ri";
import type { ImageResponse } from "../api/image/[slug]";
import useSWR from "swr";
import ReactModal from "react-modal";

const imageUrl = (slug: string) => `/api/image/${slug}`;

type Props = PromiseReturnType<typeof getServerSideProps>["props"];
export default function Image({ images, slug }: Props) {
  const [isEditOpen, setEditOpen] = React.useState(false);
  const [face, setFace] = React.useState("");
  const { data } = useSWR<ImageResponse>(imageUrl(slug), fetcher, {
    initialData: images,
  });
  React.useEffect(() => {
    const { classList } = document.querySelector("body");
    if (isEditOpen) {
      classList.add("overflow-hidden");
    } else {
      classList.remove("overflow-hidden");
    }
  }, [isEditOpen]);
  return (
    <FaceContext.Provider value={{ face, setFace }}>
      <NextHead>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@_Xetera" />
        <meta property="twitter:image" content={images.url} />
        {/* <meta property="og:type" content="website" /> */}
      </NextHead>

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
              <ImageSidebar onEdit={() => setEditOpen(true)} />
            </div>
          </article>
        </div>
        <Footer />
        <ReactModal
          isOpen={isEditOpen}
          overlayClassName="ReactModal__Overlay flex fixed h-full w-full"
          style={{
            overlay: {
              inset: "0px",
              backgroundColor: "rgba(6, 12, 14, 0.75)",
            },
          }}
          className="bg-theme h-3/4 w-full max-w-7xl m-auto border-theme-alt border-1 outline-none"
          onRequestClose={() => setEditOpen(false)}
        >
          <div>Test</div>
        </ReactModal>
      </ImageContext.Provider>
    </FaceContext.Provider>
  );
}

export const getServerSideProps = async ({ res, params }) => {
  console.log("getServerSideProps IMAGE");
  const { slug } = params;
  if (Array.isArray(slug)) {
    return {
      notFound: true,
    };
  }
  const images: ImageResponse = await fetcher(imageUrl(slug as string));
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
  console.log("[CLIENT] Rendering /pages/image/[slug]");
  return {
    props: {
      images,
      slug,
    },
  } as const;
};
