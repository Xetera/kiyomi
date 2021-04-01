import React from "react";
import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/client";
import { Gallery } from "../components/gallery";
import { MyDropzone } from "@/components/upload";
import { fetcher, IMAGES_PER_FETCH, useGet } from "@/lib/shared";
import { useSWRInfinite } from "swr";
import { Navbar } from "@/components/navbar";
import { FrontPage } from "@/components/front-page";
import { Waypoint } from "react-waypoint";
import { useScroll } from "react-use";

function getKey(index: number, prevData: any) {
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

export default function Home() {
  const pageRef = React.useRef(null);
  const [activeTab, setActiveTab] = React.useState(0);
  const [fetching, setFetching] = React.useState(false);
  const { y } = useScroll(pageRef);
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
        <div className="flex flex-col px-5 mt-12 h-full justify-start flex-1 max-w-6xl">
          <h1 className="text-8xl mb-5 font-black text-gray-100">simp.pics</h1>
          <p className="text-2xl font-semibold text-gray-400">
            A SFW image host mindful of human connections.
          </p>
          {/* <p className="text-coolGray-400 max-w-xl mb-2">
            This is my private image host. If (for some reason) you would like
            access, shoot me a DM at <b>Xetera#0001</b> on Discord with your
            expected usage amount to get an API token.
          </p>
          <p className="text-sm text-coolGray-400">No NSFW please</p> */}
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // const images = JSON.parse(JSON.stringify(await fetcher("/api/image")));
  return {
    props: {
      session: await getSession(ctx),
    },
  };
};
