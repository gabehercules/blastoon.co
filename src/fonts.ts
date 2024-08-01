import { Acme, Barlow_Condensed, Rowdies } from "next/font/google";

export const acme = Acme({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const rowdies = Rowdies({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
  variable: "--font-rowdies",
});
