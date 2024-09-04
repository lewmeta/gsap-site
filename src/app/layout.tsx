import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Menu } from "@/components/navigation/menu";

const inter = Inter({ subsets: ["latin"] });

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
        <main className="w-full h-full min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
