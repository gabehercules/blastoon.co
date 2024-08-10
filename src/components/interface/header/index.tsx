"use client";

import Logo from "@/components/elements/logo";

import { ConnectButton, useWalletInfo } from "thirdweb/react";
import { client } from "@/thirdweb";
import { blast } from "thirdweb/chains";

import { Wallet } from "thirdweb/wallets";

import { useActiveAccount, useWalletBalance } from "thirdweb/react";
// import ConnectButton from "@/components/elements/connect-button";
import Link from "next/link";
import UserWidget from "@/components/elements/user/user-widget";
import { getAddress } from "thirdweb";
import { createUser } from "@/database/create/create-user";

export default function Header() {
  const account = useActiveAccount();
  const { data: balance, isLoading } = useWalletBalance({
    client,
    chain: blast,
    address: account?.address,
  });

  const handleOnConnect = async (wallet: Wallet) => {
    console.log("Connected wallet", wallet);
  };

  return (
    <div className="header flex items-center justify-between px-6 border-b border-white/10">
      <div className="flex items-center gap-8">
        <Logo />
      </div>

      <div>
        {!account ? (
          // <ConnectButton>Connect Wallet</ConnectButton>
          <ConnectButton
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
            onConnect={handleOnConnect}
          />
        ) : (
          <UserWidget />
        )}
      </div>
    </div>
  );
}
