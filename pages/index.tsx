import { useSession } from "next-auth/client";
import Head from "next/head";

export default function Home() {
  const [sess] = useSession();
  console.log(sess);
  return (
    <pre style={{ whiteSpace: "pre" }}>{JSON.stringify(sess, null, 2)}</pre>
  );
}
