import PacksListing from "@/components/interface/packs-listing";
import { BiStoreAlt } from "react-icons/bi";

export default function Marketplace() {
  return (
    <div className="space-y-6">
      {/* packs */}
      <div className="space-y-6">
        <h1 className="text-xl font-bold">Card Packs</h1>
        <PacksListing />
      </div>

      {/* more soon */}
      <div className="flex items-center gap-2 p-3 rounded-lg bg-brand-green/10 border border-b-2 border-brand-green/50 border-b-brand-green/60 text-neutral-100">
        <BiStoreAlt size={18} />
        <p>More will come to the marketplace soon!</p>
      </div>
    </div>
  );
}
