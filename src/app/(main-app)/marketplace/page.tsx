import PacksListing from "@/components/interface/packs-listing";

export default function Marketplace() {
  return (
    <div className="flex flex-col flex-1 space-y-6">
      {/* packs */}
      <div className="space-y-6">
        <h1 className="text-xl font-bold">Card Packs</h1>
        <PacksListing />
      </div>

      {/* more soon */}
      <div className="flex items-center justify-center flex-1 space-y-4 text-lg  text-neutral-500">
        We are working on lot more to be in the marketplace soon!
      </div>
    </div>
  );
}
