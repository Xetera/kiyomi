import { Navbar } from "@/components/navbar";
import { prefetchQuery } from "@/lib/client-helpers";
import { usePersonPageQuery } from "@/__generated__/graphql";
import { Stack } from "@chakra-ui/layout";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

export default function Person() {
  const router = useRouter();
  const personId = Number(router.query.personId as string);
  console.log({ client: personId });
  const { data, isLoading } = usePersonPageQuery({ id: personId });
  console.log({ data, isLoading });
  return (
    <Stack>
      <Navbar />
      hi
    </Stack>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const personId = ctx.params?.personId;
  if (!personId) {
    throw Error("No person");
  }
  const id = Number(personId);
  console.log({ server: id });
  const dehydratedState = await prefetchQuery("PersonPage", { id });
  return {
    props: { dehydratedState },
  };
};
