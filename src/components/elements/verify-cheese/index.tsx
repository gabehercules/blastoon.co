"use client";

import {
  getNFTsByAddress,
  verifyNFTOwnership,
} from "@/utils/get-nfts-by-address";

export default function VerifyCheese({ address }: { address: string }) {
  const verifyCheese = async () => {
    console.log("Verifying $CHEESE");
    const cheese = await getNFTsByAddress(address);
  };

  const verifyOwnership = async () => {
    console.log("Verifying NFTs ownership");
    const nftsOkayla = await verifyNFTOwnership(21, "0x1234567890");
  };

  return (
    <>
      <button
        onClick={verifyCheese}
        className="bg-brand-yellow px-3 py-2 rounded-lg font-rowdies text-yellow-950"
      >
        Verify your $CHEESE
      </button>
      <button
        onClick={verifyOwnership}
        className="bg-orange-400 px-3 py-2 rounded-lg font-rowdies text-yellow-950"
      >
        Verify ownership
      </button>
    </>
  );
}
