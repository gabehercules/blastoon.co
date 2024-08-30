"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LuRefreshCw } from "react-icons/lu";

import { reverifyNfts } from "@/utils/get-nfts-by-address";
import { toast } from "sonner";

export default function VerifyOwnshipButton({
  id,
  address,
}: {
  id: string;
  address: string;
}) {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleVerifyNFTs = async () => {
    setLoading(true);

    const reverify = await reverifyNfts(address, id);

    if (!reverify) {
      setLoading(false);
      toast("Error verifying ownership");
    }

    if (reverify.total === 0) {
      setLoading(false);
      toast("No NFTs found for this address");
    }

    if (reverify.total > 0) {
      setLoading(false);
      toast(`Successfully verified ${reverify.total} NFTs`);
      router.replace("/dashboard");
    }
  };

  return (
    <>
      <button
        onClick={handleVerifyNFTs}
        className="min-w-[200px] flex items-center gap-3 text-brand-yellow font-bold px-4 py-2 rounded-lg hover:bg-white/5 transition-colors duration-300"
      >
        <LuRefreshCw className={loading ? "animate-spin" : ""} />

        {loading ? "Verifying..." : "Re-verify Ownership"}
      </button>
    </>
  );
}
