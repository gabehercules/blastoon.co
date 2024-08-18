"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BiX } from "react-icons/bi";

export default function VerifyOwnshipButton({
  id,
  address,
}: {
  id: number;
  address: string;
}) {
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleVerifyNFTs = async () => {
    setLoading(true);

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
      ? process.env.NEXT_PUBLIC_BASE_URL
      : "http://localhost:3000";

    const response = await fetch(`${baseUrl}/api/update/nfts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: Number(id),
        address,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Failed to verify ownership");
      return setMessage(
        "Failed to verify ownership. Maybe you do not own any NFTs"
      );
    }
    if (data.total < 1) {
      setLoading(false);
      setMessage(`Apparently you don't own a Blast Toon PASS :(`);
    }

    if (data.total >= 1) {
      router.replace("/dashboard");
    }
  };

  return (
    <>
      <button
        onClick={handleVerifyNFTs}
        className="flex border-brand-yellow border-2 text-brand-yellow font-bold px-4 py-2 rounded-lg"
      >
        {loading ? "Verifying..." : "Re-verify Ownership"}
      </button>
      {message ? (
        <div className="flex items-center gap-2 mt-5">
          <p className="leading-none">{message}</p>
          <button
            onClick={() => setMessage(null)}
            className="flex p-1 rounded-full bg-neutral-900 text-neutral-400 hover:bg-neutral-800"
          >
            <BiX size={14} />
          </button>
        </div>
      ) : null}
    </>
  );
}
