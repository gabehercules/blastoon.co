"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="flex items-center gap-3 text-sm px-4 py-2 rounded-lg bg-neutral-950 outline-none">
        <Image
          src={`https://avatar.vercel.sh/${user.address}.svg`}
          width={20}
          height={20}
          alt={`Avatar for ${user.address}`}
          className="rounded-full"
        />
        <div>{shortAddress}</div>
        <BiChevronDown />
      </DropdownMenuTrigger>
      {/* Panel */}
      <DropdownMenuContent
        align="end"
        className="w-[200px] bg-neutral-950 border-none rounded-lg p-3"
      >
        <Link
          href={"/dashboard"}
          className="flex p-2 rounded-lg text-white hover:bg-white/5"
        >
          Dashboard
        </Link>

        <button
          onClick={handleDisconnect}
          className="flex items-center gap-2 w-full rounded-lg text-red-500 p-2 hover:bg-red-500/10"
        >
          <FaPowerOff size={16} />
          Disconnect
        </button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
