import React from "react";
import { GetServerSideProps } from "next";
import { useSession } from "next-auth/client";
import { Gallery } from "../components/gallery";
import { MyDropzone } from "@/components/upload";
import { fetcher, useGet } from "@/lib/utils/shared";
import { useSWRInfinite } from "swr";

export default function Home({ images }) {
  function getKey(index: number, prevData: any) {
    if (!prevData?.length) {
      return null;
    }
    if (!index) {
      return `/api/image`;
    }
    return `/api/image?cursor=${index}`;
  }
  const [sess] = useSession();
  const { data } = useSWRInfinite(getKey, fetcher, { initialData: images });
  console.log(data);
  return (
    <>
      <MyDropzone />
      <Gallery images={data} />
      <pre style={{ whiteSpace: "pre" }}>{JSON.stringify(images, null, 2)}</pre>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const images = JSON.parse(JSON.stringify(await fetcher("/api/image")));
  return {
    props: {
      images,
    },
  };
};
