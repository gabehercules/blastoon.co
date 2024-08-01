"use client";

import Logo from "@/components/elements/logo";

import { BsTwitterX } from "react-icons/bs";
import { BsDiscord } from "react-icons/bs";
// import { ConnectButton } from "thirdweb/react";
import { client } from "@/thirdweb";
import { blast } from "thirdweb/chains";

import { useActiveAccount, useWalletBalance } from "thirdweb/react";
import ConnectButton from "@/components/elements/connect-button";
import Link from "next/link";

export default function Header() {
  const account = useActiveAccount();
  const { data: balance, isLoading } = useWalletBalance({
    client,
    chain: blast,
    address: account?.address,
  });
  return (
    <div className="header flex items-center justify-between px-6 border-b border-white/10">
      <div className="flex items-center gap-8">
        <Logo />
      </div>

      <ul className="flex items-center gap-4">
        <li>
          <a href="https://discord.gg/dUwBkgh2RS" target="_blank">
            <BsDiscord size={16} />
          </a>
        </li>
        <li>
          <a href="https://x.com/BlastToonCo" target="_blank">
            <BsTwitterX size={14} />
          </a>
        </li>
      </ul>

      {/* <div>
        <div>
          <p>Wallet address: {account?.address}</p>
          <p>
            Wallet balance: {balance?.displayValue} {balance?.symbol}
          </p>
        </div>
      </div> */}

      <div>
        {/* <ConnectButton
          client={client}
          detailsButton={{
            style: {
              backgroundColor: "#000",
              color: "#fff",
              padding: "0.2rem 1.5rem",
              borderRadius: "5px",
              fontSize: "0.875rem",
              fontWeight: 500,
            },
          }}
          appMetadata={{
            name: "BlastToon Co.",
            description:
              "BlastToon Co. Where you can collect cards, and earn rewards.",
          }}
          chain={blast}
        /> */}
        {!account ? (
          <ConnectButton>Connect Wallet</ConnectButton>
        ) : (
          <Link
            href="/dashboard"
            className="bg-gradient-to-b from-yellow-blast to-yellow-300 border-b-2 border-t border-yellow-200 rounded-lg px-5 py-[6px] text-yellow-950 text-sm font-semibold"
          >
            Dashboard
          </Link>
        )}
      </div>
    </div>
  );
}
