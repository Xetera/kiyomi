import React from "react";
import ImageDisplay from "@/components/image-display";
import ImageSidebar from "@/components/image-sidebar";
import { FaceContext, ImageContext } from "@/models/contexts";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import NextHead from "next/head";
import { RiSpyLine } from "react-icons/ri";

import ReactModal from "react-modal";
import { useRouter } from "next/router";
import { MimeType, useOneImageQuery } from "@/__generated__/graphql";
import withApollo from "@/lib/apollo";
import { ImageEditModal } from "@/components/image-edit-modal";
import { QueryClient } from "react-query";
import { GetServerSideProps } from "next";
import { dehydrate } from "react-query/hydration";
import { prefetchQuery } from "@/lib/client-helpers";
import { prisma } from "@/lib/db";
import { getSession } from "next-auth/client";

const Image = () => {
  const [isEditOpen, setEditOpen] = React.useState(false);
  const router = useRouter();
  const slug = router.query.slug as string | undefined;
  const [face, setFace] = React.useState("");
  const { data, isFetching, refetch } = useOneImageQuery({
    slug: slug as string,
  });
  function closeModal() {
    refetch();
    setEditOpen(false);
  }

  React.useEffect(() => {
    const { classList } = document.querySelector("body")!;
    if (isEditOpen) {
      classList.add("overflow-hidden");
    } else {
      classList.remove("overflow-hidden");
    }
  }, [isEditOpen]);
  if (!data) {
    return null;
  }
  if (!data) {
    return null;
  }
  const { image } = data;
  if (!image) {
    return null;
  }

  return (
    <FaceContext.Provider value={{ face, setFace }}>
      <NextHead>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@_Xetera" />
        <meta property="twitter:image" content={image.rawUrl} />
      </NextHead>

      <ImageContext.Provider value={image}>
        <Navbar />
        {!image.public && (
          <div className="text-gray-400 rounded border-b-1 border-theme-subtle text-sm lg:text-base">
            <div className="max-w-7xl mx-auto py-3 px-4 flex items-center font-semibold">
              <RiSpyLine className="mr-2" />
              This image is unlisted and can only be viewed with a link.
            </div>
          </div>
        )}
        <div className="w-full relative overflow-hidden">
          {image.mimetype !== MimeType.Gif && (
            <img
              src={image.rawUrl}
              style={{
                ...(image.width! < 1000 ? { filter: "blur(2px)" } : {}),
                boxShadow: "inset 0 0 30px 15px #212121",
                zIndex: -1,
                WebkitMaskImage:
                  "linear-gradient(to top, transparent 2%, black 73%)",
              }}
              className="absolute w-full opacity-[0.05] max-h-full object-cover object-center"
            />
          )}
          <div className="justify-center mx-auto max-w-7xl px-4 lg:my-24 my-4">
            <article className="flex gap-8 justify-center md:flex-row flex-col">
              <div className="flex">
                {image.caption && (
                  <h1 className="text-2xl font-black mb-2 text-blueGray-500">
                    {image.caption}
                  </h1>
                )}
                <ImageDisplay onEdit={() => setEditOpen(true)} />
              </div>
              <div className="overflow-hidden h-[min-content] min-w-[250px]">
                <ImageSidebar />
              </div>
            </article>
          </div>
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
          onRequestClose={closeModal}
        >
          <ImageEditModal image={image} />
        </ReactModal>
      </ImageContext.Provider>
    </FaceContext.Provider>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const slug = ctx.params!.slug as string;
  prisma.image
    .update({
      where: { slug },
      data: {
        views: {
          increment: 1,
        },
      },
    })
    .catch(console.error);
  const dehydratedState = await prefetchQuery("OneImage", { slug });
  return {
    props: {
      session: await getSession(ctx),
      dehydratedState,
    },
  };
};

export default Image;
