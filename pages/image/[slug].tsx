import React from "react";
import { prisma } from "@/lib/db";
import { fetcher, useGet } from "@/lib/utils/shared";
import { GetServerSideProps } from "next";
import ImageDisplay from "@/components/image-display";
import ImageSidebar from "@/components/image-sidebar";
import { Palette } from "@/components/palette-color";
import { PersonPortrait } from "@/components/person-preview";
import { FaceContext } from "@/models/contexts";
import { Footer } from "@/components/footer";

const imageUrl = (slug: string) => `/api/image/${slug}`;

export default function Image({ images, slug }) {
  const [face, setFace] = React.useState(-1);
  const { data } = useGet(imageUrl(slug), { initialData: images });
  return (
    <FaceContext.Provider value={{ face, setFace }}>
      <div className="justify-center max-w-6xl mx-auto">
        <article className="mt-24 flex gap-8">
          <div className="flex flex-col">
            {data.caption && (
              <h1 className="text-2xl font-black mb-2 text-blueGray-500">
                {data.caption}
              </h1>
            )}
            <div className="flex flex-1 flex-col">
              <ImageDisplay image={data} />
            </div>
          </div>
          <div
            style={{ height: "min-content", minWidth: "250px" }}
            className="overflow-hidden"
          >
            <ImageSidebar image={data} />
          </div>
        </article>
        <Footer />
      </div>
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
