import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import Header from "@/components/interface/header";
import Footer from "@/components/interface/footer";
import { acme, barlowCondensed, niceSugar, rowdies } from "@/fonts";
import AuthProvider from "@/contexts/auth-provider";
import { Toaster } from "@/components/ui/sonner";

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
  const maintenance = true;

  if (maintenance) {
    return (
      <html lang="en">
        <body className={`${inter.className} ${niceSugar.variable}`}>
          {children}
        </body>
      </html>
    );
  }

  return (
    <AuthProvider>
      <html lang="en">
        <body
          className={`${inter.className} ${barlowCondensed.variable} ${rowdies.variable} ${acme.variable} ${niceSugar.variable} page-layout`}
        >
          <Header />
          <main className="main-layout overflow-hidden sm:overflow-y-auto">
            {children}
          </main>
          <Footer />
          <Toaster
            position={"bottom-center"}
            className="bg-neutral-800 rounded-lg text-white font-nicesugar border-white/5"
          />
        </body>
      </html>
    </AuthProvider>
  );
}
