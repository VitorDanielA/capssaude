import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="pt-br">
      <Head />
      <body className="">
        <Navbar />
        <Sidebar />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
