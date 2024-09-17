import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="pt-br">
      <Head />
      <body className="!bg-[#f3f3f3]">
        <Navbar />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
