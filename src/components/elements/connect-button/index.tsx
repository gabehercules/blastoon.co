"use client";

import { useConnect } from "thirdweb/react";
import { createWallet, injectedProvider } from "thirdweb/wallets";
import { useConnectModal } from "thirdweb/react";
import { client } from "@/thirdweb";

interface ConnectButtonProps {
  children: React.ReactNode;
}

export default function ConnectButton({ children }: ConnectButtonProps) {
  //   const { connect, isConnecting, error } = useConnect();
  const { connect, isConnecting } = useConnectModal();

  async function handleConnect() {
    const wallet = await connect({ client }); // opens the connect modal
    console.log("connected to", wallet);
  }

  return (
    <button
      onClick={handleConnect}
      className="px-4 py-1 rounded-lg border border-b-[3px] border-yellow-200/60 text-sm font-semibold bg-gradient-to-tr from-yellow-blast from-10% to-yellow-600 to-90% text-yellow-950"
    >
      {children}
    </button>
  );
}
