"use client";

import { useRouter } from "next/navigation";

import { BiLoaderAlt } from "react-icons/bi";

import { useState } from "react";
import { getAccount, getProvider } from "@/lib/ethers";
import { signIn } from "next-auth/react";

interface ConnectButtonProps {
  children: React.ReactNode;
}

export default function ConnectButton({ children }: ConnectButtonProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleConnect = async () => {
    setLoading(true);
    const provider = await getProvider();

    if (!provider) {
      setLoading(false);

      // TODO: handle error - maybe a toast message saying that the user needs to install a wallet
      return;
    }

    const address = await getAccount();

    if (!address) {
      setLoading(false);
      console.log("NO ACCOUNTS WERE ALLOWED");
    }

    // console.log("ACCOUNT NO CLICK", address);
    // console.log("ACCOUNT NO CLICK TYPEOF", typeof address);

    await signIn("credentials", {
      address,
      redirect: false,
    });
    setLoading(false);
    router.push("/dashboard");
  };

  return (
    <button
      disabled={loading}
      className={`min-w-[150px] flex items-center justify-center font-bold px-4 py-[6px] rounded-lg bg-brand-yellow text-yellow-950 disabled:opacity-50 disabled:cursor-not-allowed`}
      onClick={handleConnect}
    >
      {loading ? <BiLoaderAlt size={20} className="animate-spin" /> : children}
    </button>
  );
}
