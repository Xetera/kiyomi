import React from "react";
import { prisma } from "@/lib/db";
import { fetcher, imageFindOptions } from "@/lib/utils/data-fetching";
import { GetServerSideProps } from "next";
import useSWR from "swr";
import ImageDisplay from "@/components/image-display";
import ImageSidebar from "@/components/image-sidebar";
import { Palette } from "@/components/palette-color";

const imageUrl = (slug: string) => `/api/image/${slug}`;

export default function Image({ images, slug }) {
  const { data } = useSWR(imageUrl(slug), fetcher, { initialData: images });
  return (
    <div className="grid grid-cols-right-sidebar h-screen">
      <div className="w-full flex flex-col">
        <div className="flex flex-1 p-4 overflow-hidden">
          <ImageDisplay image={data} />
        </div>
        <div className="p-4 border-t-2 border-blueGray-800">
          <Palette colors={data.palette} />
        </div>
      </div>
      <ImageSidebar image={data} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { slug } = params;
  const images = await fetcher(imageUrl(slug as string));
  return {
    props: {
      images,
      slug,
    },
  };
};
