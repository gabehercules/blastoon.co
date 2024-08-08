"use client";

import { useRouter } from "next/navigation";

import { useConnect } from "thirdweb/react";
import { createWallet, injectedProvider } from "thirdweb/wallets";
import { generatePayload } from "@/app/actions/auth";
import { signLoginPayload } from "thirdweb/auth";

import { useConnectModal } from "thirdweb/react";
import { client } from "@/thirdweb";
import { BiLoaderAlt } from "react-icons/bi";

interface ConnectButtonProps {
  children: React.ReactNode;
}

export default function ConnectButton({ children }: ConnectButtonProps) {
  const { connect, isConnecting } = useConnectModal();
  const router = useRouter();

  async function handleConnect() {
    const wallet = await connect({ client }); // opens the connect modal
    const account = wallet.getAccount();

    // log in teh console the connected wallet address
    // console.log("connected to", wallet.getAccount()?.address);

    const signature = await account?.signMessage({ message: "Signing" });

    // log in the console the signature
    // console.log("signature", signature);

    router.push("/dashboard");
  }

  return (
    <button
      onClick={handleConnect}
      className="w-[150px] flex items-center justify-center px-4 py-1 rounded-lg border border-b-[3px] border-yellow-200/60 text-sm font-semibold bg-gradient-to-tr from-yellow-blast from-10% to-yellow-600 to-90% text-yellow-950"
    >
      {isConnecting ? (
        <BiLoaderAlt className="animate-spin" size={18} />
      ) : (
        children
      )}
    </button>
  );
}
