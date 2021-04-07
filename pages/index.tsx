import Head from "next/head";
import React from "react";
import Header from "../components/header";
import Upload from "../components/upload";
import { Text } from "@chakra-ui/react";

export default function Home() {
  return (
    <div>
      <Head>
        <title>CODS</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header />
        <Upload />
      </main>

      <footer>
        <Text>© Makerbay 2021 | All rights reserved</Text>
      </footer>
    </div>
  );
}
