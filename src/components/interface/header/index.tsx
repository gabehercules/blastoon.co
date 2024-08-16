"use client";

import Logo from "@/components/elements/logo";

import ConnectButton from "@/components/elements/connect-button";
import SignoutButton from "@/components/elements/signout-button";
import { useSession } from "next-auth/react";
import UserWidget from "@/components/elements/user/user-widget";
import CheeseBalance from "@/components/elements/user/cheese-balance";
import Link from "next/link";

interface ExtendedUser {
  address: string;
}

export default function Header() {
  const { data: session, status } = useSession();

  console.log("Session", session);
  console.log("Status", status);

  // @ts-ignore
  const address = session?.user.address;

  return (
    <div className="header flex items-center justify-between gap-6 px-6 border-b border-white/10">
      <div className="flex items-center gap-8">
        <Logo />
      </div>

      <div className="flex">
        <ul className="flex items-center gap-3">
          <li>
            <Link href="/packs">Card Packs</Link>
          </li>
          <li>
            <Link href="/" className="pointer-events-none opacity-50">
              Marketplace
              <span className="text-xs ml-1 -pt-2">Soon</span>
            </Link>
          </li>
        </ul>
      </div>

      <div className="flex-1 flex items-center justify-end gap-4">
        {status !== "authenticated" ? (
          <ConnectButton>Connect</ConnectButton>
        ) : (
          <>
            <CheeseBalance address={address} />
            <UserWidget />
          </>
        )}
      </div>
    </div>
  );
}
