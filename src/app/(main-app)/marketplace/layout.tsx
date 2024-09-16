// import MarketplaceSideview from "@/components/interface/marketplace-sideview";

import "@/styles/marketplace.css";

export default function MarketplaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-full gap-4 p-10">
      {children}
      {/* packview */}
      {/* <MarketplaceSideview /> */}
    </main>
  );
}
