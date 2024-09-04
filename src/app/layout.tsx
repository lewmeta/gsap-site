import type { Metadata } from "next";
import { Syncopate } from "next/font/google";

import { Menu } from "@/components/navigation/menu";

import "./globals.css";

const inter = Syncopate({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "GSAP animations",
  description: "GSAP animations site with next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Menu />
        <main className="w-full bg-green-600 h-full min-h-screen flex items-center justify-center">
          {children}
        </main>
      </body>
    </html>
  );
}
