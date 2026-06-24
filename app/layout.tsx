import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { inter, norbert } from "@/lib/font";

export const metadata: Metadata = {
  title: "Harcorp Industries — Artificial Super Intelligence & Matter",
  description:
    "Harcorp Industries is a research and development company focused on building artificial super intelligence and matter.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${norbert.variable} h-full antialiased dark`}
    >
      <body>
        <ScrollProgress />
        <Navbar />
        <main className="min-h-screen w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
