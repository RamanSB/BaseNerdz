import "./globals.css";

import type { Metadata } from "next";
import { Inter, Pacifico } from "next/font/google";
import Providers from "./providers";
import Navbar from "@/components/Navbar";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BaseNerdz",
  description: "Base Nerdz by 0xNascosta",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}

