import { Navbar } from "@/components/navbar";
import { fetcher, useGet } from "@/lib/utils/shared";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import React from "react";

const imageUrl = `/api/profile`;

export default function Image(props) {
  const { data } = useGet(imageUrl, {});
  console.log(data);
  return (
    <div>
      <Navbar />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  console.log(session);
  if (!session) {
    return {
      props: {},
      redirect: {
        destination: "/api/auth/signin",
      },
    };
  }
  const props = await fetcher(imageUrl, {
    redirect: "follow",
    headers: {
      Cookie: req.headers.cookie,
    },
  });
  return { props };
};
