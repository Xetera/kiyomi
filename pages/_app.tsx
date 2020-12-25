import React from "react";
import { Provider } from "next-auth/client";
import "../styles/tailwind.css";
import "../styles/globals.css";
import "modern-normalize";
import { Navbar } from "@/components/navbar";

export default function App({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Navbar />
      <Component {...pageProps} />
    </Provider>
  );
}
