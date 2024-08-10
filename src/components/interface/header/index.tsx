"use client";

import Logo from "@/components/elements/logo";

import { ConnectButton, useWalletInfo } from "thirdweb/react";
import { client } from "@/lib/thirdweb";
import { blast } from "thirdweb/chains";

import { Wallet } from "thirdweb/wallets";

import { useActiveAccount, useWalletBalance } from "thirdweb/react";
// import ConnectButton from "@/components/elements/connect-button";
import Link from "next/link";
import UserWidget from "@/components/elements/user/user-widget";
import { getAddress } from "thirdweb";
import { createUser } from "@/database/create/create-user";
import { getUser } from "@/database/read/get-user";
import { verifySignature } from "thirdweb/auth";

import { generatePayload, isLoggedIn, login, logout } from "@/actions/login";

export default function Header() {
  const account = useActiveAccount();
  const { data: balance, isLoading } = useWalletBalance({
    client,
    chain: blast,
    address: account?.address,
  });

  const message = {
    message: "Sign in to BlastToon Co.",
    chain: blast,
    chainId: blast.id,
    tos: "https://blasttoon.co/tos",
  };

  const handleOnConnect = async (wallet: Wallet) => {
    console.log("Connected wallet", wallet);

    if (!account || !account.address) return;

    // verifica se a conta existe no banco de dados
    const user = await getUser(account.address);

    console.log("USER", user);

    const signature = await account.signMessage({
      message: "Signing",
    });

    console.log("SIGNATURE", signature);

    if (!user) {
      const user = await createUser(account.address, signature);
      console.log("USER CREATED", user);
    }

    const isValidSignature = await verifySignature({
      message: "Signing",
      signature: signature,
      address: account.address,
      client: client,
    });

    if (!isValidSignature) return console.log("Invalid signature");
  };

  return (
    <div className="header flex items-center justify-between px-6 border-b border-white/10">
      <div className="flex items-center gap-8">
        <Logo />
      </div>

      <div>
        <ConnectButton
          client={client}
          connectButton={{
            style: {
              backgroundColor: "#ffd71f",
              color: "#221805",
              padding: "0.5rem 1rem",
              borderRadius: "7px",
              fontSize: ".9rem",
              fontWeight: 600,
            },
          }}
          detailsButton={{
            style: {
              backgroundColor: "#000",
              color: "#fff",
              padding: "0.2rem 1rem",
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
          // onConnect={handleOnConnect}
          auth={{
            isLoggedIn: async (address) => {
              return await isLoggedIn();
            },
            doLogin: async (params) => {
              await login(params);
            },
            getLoginPayload: async ({ address }) => {
              return generatePayload({ address });
            },
            doLogout: async () => {
              await logout();
            },
          }}
        />
        {/* <ConnectButton>Connect</ConnectButton> */}
      </div>
    </div>
  );
}
