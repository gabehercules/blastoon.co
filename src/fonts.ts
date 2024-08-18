import { Acme, Barlow_Condensed, Rowdies } from "next/font/google";
import localFont from "next/font/local";

export const acme = Acme({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-acme",
});

export const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-barlow",
});

export const rowdies = Rowdies({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
  variable: "--font-rowdies",
});

export const niceSugar = localFont({
  src: [
    {
      path: "../public/assets/fonts/nice-sugar.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-nicesugar",
});
