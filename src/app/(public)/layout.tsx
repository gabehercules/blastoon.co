import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { niceSugar } from "@/fonts";
import AuthProvider from "@/contexts/auth-provider";
import { Toaster } from "@/components/ui/sonner";
import "../../styles/globals.css";
import HomeHeader from "@/components/interface/home-header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blast Toon Co. | Collect $CHEESE while playing cards!",
  description: "Collect $CHEESE while playing cards!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <body
          className={`${inter.className} ${niceSugar.variable} home-layout`}
        >
          <HomeHeader />
          <main className="home-main overflow-hidden sm:overflow-y-auto">
            {children}
          </main>
          <Toaster
            position={"bottom-center"}
            className="bg-neutral-800 rounded-lg text-white font-nicesugar border-white/5"
          />
        </body>
      </html>
    </AuthProvider>
  );
}
