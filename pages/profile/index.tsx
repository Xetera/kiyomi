import { Gallery } from "@/components/gallery";
import { Navbar } from "@/components/navbar";
import { User } from "@/components/user";
import { getSession, useSession } from "next-auth/client";
import React from "react";
import useSWR from "swr";
import { useMeQuery } from "@/lib/__generated__/graphql";
import withApollo from "@/lib/apollo";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { prefetchQuery } from "@/lib/client-helpers";

function Image() {
  const { data } = useMeQuery();
  if (!data?.me) {
    return <Navbar />;
  }

  return (
    <div>
      <Navbar />
      <div className="flex flex-col w-full mx-auto max-w-7xl px-8">
        <div className="flex justify-content w-full py-10">
          <div>
            <User user={data.me} bottom={<h1>hi</h1>} />
          </div>
        </div>
        <Gallery images={data.me.images} />
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const dehydratedState = await prefetchQuery("MeQuery", {});
  return {
    props: { dehydratedState },
  };
};

export default Image;
