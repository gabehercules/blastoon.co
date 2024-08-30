"use client";

import Logo from "@/components/elements/logo";

import ConnectButton from "@/components/elements/connect-button";
import SignoutButton from "@/components/elements/signout-button";
import { useSession } from "next-auth/react";
import UserWidget from "@/components/elements/user/user-widget";
import CheeseBalance from "@/components/elements/user/cheese-balance";
import Link from "next/link";
import Image from "next/image";

import blurLogo from "/public/blur-logo.png";
import { BsDiscord, BsTwitterX } from "react-icons/bs";

interface ExtendedUser {
  address: string;
  id: string;
}

export default function Header() {
  const { data: session, status } = useSession();

  // console.log("Session", session);
  // console.log("Status", status);

  // improve this fucking code later i will cry

  // if (!session || !session.user) {
  //   return <p>No session</p>;
  // }

  const user = session?.user as ExtendedUser;

  const address = user?.address;
  const id = user?.id;

  return (
    <div className="header flex items-center justify-between gap-6 px-6 border-b border-white/10">
      <div className="flex items-center gap-8">
        <Logo />
      </div>

      <div className="flex sm:hidden">
        <ul className="flex items-center gap-3">
          <li>
            <Link href="/">Card Packs</Link>
          </li>
          <li>
            <Link href="/" className="pointer-events-none opacity-50">
              Marketplace
              <span className="text-xs ml-1 -pt-2">Soon</span>
            </Link>
          </li>
        </ul>
      </div>

      <div className="sm:hidden">
        <ul className="flex items-center gap-4 px-6">
          <li>
            <a
              href={"https://blur.io/blast/collection/blastoon-co-pass"}
              target="_blank"
            >
              <Image
                src={blurLogo}
                width={40}
                height={20}
                alt="Blur Logo"
                className="w-auto"
              />
            </a>
          </li>
          <li>
            <a href="https://discord.gg/BM4Y5c6G9R" target="_blank">
              <BsDiscord size={16} />
            </a>
          </li>
          <li>
            <a href="https://x.com/BlastToonCo" target="_blank">
              <BsTwitterX size={14} />
            </a>
          </li>
        </ul>
      </div>

      <div className="flex-1 flex items-center justify-end gap-4">
        {status !== "authenticated" ? (
          <ConnectButton>Connect</ConnectButton>
        ) : (
          <>
            <CheeseBalance address={address} id={id} />
            <UserWidget />
          </>
        )}
      </div>
    </div>
  );
}
