import Navbar from "@/components/Navbar";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="pt-br">
      <Head />
      <body className="">
        <Navbar />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
