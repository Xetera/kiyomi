import { Gallery } from "@/components/gallery";
import { Navbar } from "@/components/navbar";
import { User } from "@/components/user";
import { fetcher, useGet } from "@/lib/utils/shared";
import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/client";
import React from "react";
import useSWR from "swr";

const profileUrl = `/api/profile`;

export default function Image(props) {
  const [session] = useSession();
  console.log("session ", session);
  const { data } = useSWR(profileUrl, {
    initialData: props,
  });
  return (
    <div>
      <Navbar />
      <div className="flex flex-col w-full mx-auto max-w-7xl px-8">
        <div className="flex justify-content w-full py-10">
          <div>
            <User user={session.user} bottom={<h1>hi</h1>} />
          </div>
        </div>
        <Gallery images={data.images} />
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  console.log("session be", session);
  if (!session) {
    return {
      props: {},
      redirect: {
        destination: "/api/auth/signin",
      },
    };
  }
  const props = await fetcher(profileUrl, {
    redirect: "follow",
    headers: {
      Cookie: req.headers.cookie,
    },
  });
  return { props: { ...props, session } };
};
