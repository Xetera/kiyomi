import type { ProfileResponse } from "../api/profile";
import { Gallery } from "@/components/gallery";
import { Navbar } from "@/components/navbar";
import { User } from "@/components/user";
import { fetcher, PromiseReturnType, useGet } from "@/lib/shared";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getSession, useSession } from "next-auth/client";
import React from "react";
import useSWR from "swr";
import { useMeQuery } from "@/lib/__generated__/graphql";
import withApollo from "@/lib/apollo";
import { useRouter } from "next/router";

// const profileUrl = `/api/profile`;

// type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

function Image() {
  const [session] = useSession();
  const router = useRouter();
  const { data } = useMeQuery();
  console.log(data);
  if (!session || !data?.me) {
    return <Navbar />;
  }
  // const { data } = useSWR<ProfileResponse>(profileUrl, {
  //   initialData: props,
  // });
  return (
    <div>
      <Navbar />
      <div className="flex flex-col w-full mx-auto max-w-7xl px-8">
        <div className="flex justify-content w-full py-10">
          <div>
            <User user={session.user} bottom={<h1>hi</h1>} />
          </div>
        </div>
        <Gallery images={data.me.images} />
      </div>
    </div>
  );
}

// export const getServerSideProps = async ({ req, res }) => {
//   const session = await getSession({ req });
//   console.log("session be", session);
//   if (!session) {
//     return {
//       props: {},
//       redirect: {
//         destination: "/api/auth/signin",
//       },
//     };
//   }
//   const props = await fetcher(profileUrl, {
//     redirect: "follow",
//     headers: {
//       Cookie: req.headers.cookie,
//     },
//   });
//   return { props: { ...props, session } } as const;
// };

export default withApollo({ ssr: true })(Image);
