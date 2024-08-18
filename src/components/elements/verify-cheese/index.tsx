"use client";

import { getNFTsByAddress } from "@/utils/get-nfts-by-address";

export default function VerifyCheese({ address }: { address: string }) {
  const verifyNfts = async () => {
    console.log("Verifying NFTs");
    const nfts = await getNFTsByAddress(address);

    console.log("NFTS FOUND", nfts);
  };

  const verifyOwnership = async () => {
    console.log("VERIFYING NFT OWNERSHIP -------------");
    await fetch("http://localhost:3000/api/update/nfts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: 38,
        address,
      }),
    });
  };

  return (
    <>
      <button
        onClick={verifyNfts}
        className="bg-brand-yellow px-3 py-2 rounded-lg font-nicesugar text-yellow-950"
      >
        Verify your NFTs
      </button>
      <button
        onClick={verifyOwnership}
        className="bg-orange-400 px-3 py-2 rounded-lg font-nicesugar text-yellow-950"
      >
        Verify and Update NFTs
      </button>
    </>
  );
}
