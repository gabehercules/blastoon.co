import { Acme, Barlow_Condensed } from "next/font/google";

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
