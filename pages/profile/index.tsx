import { Gallery } from "@/components/gallery";
import { Navbar } from "@/components/navbar";
import { User } from "@/components/user";
import { getSession, useSession } from "next-auth/client";
import React from "react";
import useSWR from "swr";
import { useMeQuery } from "@/lib/__generated__/graphql";
import withApollo from "@/lib/apollo";
import { useRouter } from "next/router";

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
            <User user={data.me} bottom={<h1>hi</h1>} />
          </div>
        </div>
        <Gallery images={data.me.images} />
      </div>
    </div>
  );
}

export default withApollo({ ssr: true })(Image);
