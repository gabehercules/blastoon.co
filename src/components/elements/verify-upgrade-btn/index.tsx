"use client";

import { useState } from "react";
import { verifyUpgrades } from "@/utils/temp/verify-upgrades";
import { BiLoader, BiX } from "react-icons/bi";

export default function VerifyUpgradeButton({
  address,
  id,
}: {
  address: string;
  id: number;
}) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleVerifyUpgrade = async () => {
    setLoading(true);
    const result = await verifyUpgrades(address, id);

    if (typeof result === "string") {
      setLoading(false);
      return setMessage(result);
    }
    setMessage("Relead the page");
    setLoading(false);
  };

  return (
    <button
      onClick={handleVerifyUpgrade}
      className="flex items-center gap-2 font-bold bg-yellow-500 text-yellow-950 px-4 py-2 rounded-lg disabled:bg-yellow-600"
      disabled={loading}
    >
      <BiLoader size={20} className={loading ? "animate-spin" : ""} />
      {message ? message : "Verify Upgrade"}
    </button>
  );
}
