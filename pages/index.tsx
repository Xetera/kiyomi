import React from "react";
import { prisma } from "@/lib/db";
import { GetServerSideProps } from "next";
import { useSession } from "next-auth/client";
import Head from "next/head";
import { Gallery } from "../components/gallery";
import { MyDropzone } from "@/components/upload";
import useSWR from "swr";
import { fetcher } from "@/lib/utils/data-fetching";

export default function Home({ images }) {
  const [sess] = useSession();
  const { data } = useSWR("/api/image", fetcher, { initialData: images });
  console.log(data);
  return (
    <>
      <Gallery images={data} />
      <pre style={{ whiteSpace: "pre" }}>{JSON.stringify(images, null, 2)}</pre>
      <MyDropzone />
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
