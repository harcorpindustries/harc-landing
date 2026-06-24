import { Inter } from "next/font/google";
import localFont from "next/font/local";

export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const norbert = localFont({
  src: [
    {
      path: "../public/fonts/nobert/norbert-regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/nobert/norbert-regular-italic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/nobert/norbert-medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/nobert/norbert-semibold.otf",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-norbert",
  display: "swap",
});
