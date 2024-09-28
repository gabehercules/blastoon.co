import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/interface/header";
import Footer from "@/components/interface/footer";
import { niceSugar } from "@/fonts";
import AuthProvider from "@/contexts/auth-provider";
import { Toaster } from "@/components/ui/sonner";
import Sidebar from "@/components/interface/sidebar";
import Topbar from "@/components/interface/topbar";
import QueryProvider from "@/contexts/query-provider";
import "../../styles/globals.css";

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
          className={`${inter.className} ${niceSugar.variable} page-layout`}
        >
          <QueryProvider>
            <Sidebar />
            <Header />
            <Topbar />
            <main className="main-layout overflow-y-auto sm:overflow-y-auto p-8">
              {children}
            </main>
            <Footer />
            <Toaster
              position={"bottom-center"}
              className="bg-neutral-800 rounded-lg text-white font-nicesugar border-white/5"
            />
          </QueryProvider>
        </body>
      </html>
    </AuthProvider>
  );
}
