"use client";

import { useActiveWallet } from "thirdweb/react";

export default function Profile() {
  const activeWallet = useActiveWallet();

  console.log("activeWallet", activeWallet);

  if (!activeWallet) {
    return (
      <div>
        <h1>Connect wallet to view profile</h1>
      </div>
    );
  }

  return (
    <div>
      <h1>profile</h1>
    </div>
  );
}
