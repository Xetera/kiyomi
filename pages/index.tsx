import React from "react";
import { GetServerSideProps } from "next";
import { useSession } from "next-auth/client";
import { Gallery } from "../components/gallery";
import { MyDropzone } from "@/components/upload";
import { fetcher, IMAGES_PER_FETCH, useGet } from "@/lib/shared";
import { useSWRInfinite } from "swr";
import { Navbar } from "@/components/navbar";
import { FrontPage } from "@/components/front-page";
import { Waypoint } from "react-waypoint";
import { useScroll } from "react-use";
import type { HomeResponse } from "./api/image";

function getKey(index: number, prevData: any) {
  console.log("fetching");
  console.log(index);
  console.log(prevData);
  if (!index) {
    return `/api/image`;
  }
  return `/api/image?cursor=${prevData.cursor}`;
}

function Tab({ active, children }) {
  return (
    <span className={`${active ? "text-blueGray-300" : "text-blueGray-500"}`}>
      {children}
    </span>
  );
}

export default function Home({ images }: { images: HomeResponse }) {
  const pageRef = React.useRef(null);
  const [activeTab, setActiveTab] = React.useState(0);
  const [fetching, setFetching] = React.useState(false);
  const { y } = useScroll(pageRef);
  console.log(y);
  // const {
  //   data,
  //   setSize,
  //   size,
  //   error,
  //   isValidating,
  // } = useSWRInfinite<HomeResponse>(getKey, fetcher, {
  //   // initialData: images,
  //   onSuccess(data) {
  //     console.log("success", data);
  //     setFetching(false);
  //   },
  // });
  // const imagess = data ? [].concat(...data.map((d) => d.data)) : [];
  // console.log("imagess", imagess);
  // async function getMore() {
  //   setFetching(true);
  //   console.log("getting more?");
  //   if (fetching) {
  //     return;
  //   }
  //   console.log("not already fetching, fetching now");
  //   console.log("getting more data!");
  //   await setSize((size) => size + 1);
  //   setFetching(false);
  // }
  // if (!data) {
  //   return "loading...";
  // }
  // if (error) {
  //   console.log("error", error);
  // }
  // console.log("isValidating", isValidating);
  // const { cursor } = data[data.length - 1];
  return (
    <>
      <Navbar />
      <div
        className="relative flex-1 flex-row flex justify-center"
        ref={pageRef}
      >
        <div className="flex flex-col mx-auto px-5 mt-12 max-w-6xl h-full justify-start">
          <h1 className="text-6xl mb-3 font-bold">Hi, it's me Xetera</h1>
          <p className="text-coolGray-400 max-w-xl mb-2">
            This is my private image host. If (for some reason) you would like
            access, shoot me a DM at <b>Xetera#0001</b> on Discord with your
            expected usage amount to get an API token.
          </p>
          <p className="text-sm text-coolGray-400">No NSFW please</p>
        </div>
        {/* <FrontPage />
          <aside className="flex sticky top-0 z-20 bg-theme py-3 w-full">
            <div className="grid gap-4 font-semibold grid-flow-col">
              <Tab active={true}>Popular</Tab>
              <Tab active={false}>Latest</Tab>
            </div>
          </aside>
          <main className="w-full relative pb-20">
            {error ? (
              <p>Crap... we had an error</p>
            ) : (
              <>
                <Gallery images={imagess} />
                <Waypoint onEnter={getMore} />
              </>
            )}
          </main>
        </div> */}
      </div>
      {/* <pre style={{ whiteSpace: "pre" }}>{JSON.stringify(images, null, 2)}</pre> */}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  // const images = JSON.parse(JSON.stringify(await fetcher("/api/image")));
  return {
    props: {
      images: [],
    },
  };
};
