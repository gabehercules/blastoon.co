"use client";

import { verifyUpgrades } from "@/utils/temp/verify-upgrades";

export default function VerifyUpgradeButton() {
  const handleVerifyUpgrade = async () => {
    await verifyUpgrades("0x97A3dB86574A8Ab10A8c141f3f6b7Dc34cB3ade5", 3);
  };

  return <button onClick={handleVerifyUpgrade}>Verify upgrade</button>;
}
