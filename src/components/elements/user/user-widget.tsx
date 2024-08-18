"use client";

import {
  Popover,
  PopoverBackdrop,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { BiChevronDown } from "react-icons/bi";
import { FaPowerOff } from "react-icons/fa6";

interface ExtendedUser {
  address: string;
}

export default function UserWidget() {
  const { data: session, status } = useSession();

  if (!session || !session.user) return;

  const user = session.user as ExtendedUser;

  const shortAddress =
    user.address?.slice(0, 3) + "..." + user.address?.slice(-4);

  const handleDisconnect = () => {
    signOut({
      redirect: true,
    });
  };

  return (
    <Popover className="relative">
      <PopoverButton className="flex items-center gap-3 text-sm px-4 py-2 rounded-lg bg-neutral-950 focus:ring-2 focus:ring-brand-yellow/60 outline-none">
        <Image
          src={`https://avatar.vercel.sh/${user.address}.svg`}
          width={20}
          height={20}
          alt={`Avatar for ${user.address}`}
          className="rounded-full"
        />
        <div>{shortAddress}</div>
        <BiChevronDown />
      </PopoverButton>
      {/* Panel */}
      <PopoverBackdrop className="fixed inset-0" />
      <PopoverPanel
        className="absolute right-0 w-48 bg-neutral-950 rounded-lg p-3"
        anchor={{ gap: 8, to: "bottom end" }}
      >
        <ul className="text-sm">
          <li>
            <Link
              href={"/dashboard"}
              className="flex p-2 rounded-lg hover:bg-white/5"
            >
              Dashboard
            </Link>
          </li>

          <li>
            <button
              onClick={handleDisconnect}
              className="flex items-center gap-2 w-full rounded-lg text-red-500 p-2 hover:bg-red-500/10"
            >
              <FaPowerOff size={16} />
              Disconnect
            </button>
          </li>
        </ul>
      </PopoverPanel>
    </Popover>
  );
}
