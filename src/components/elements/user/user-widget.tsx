"use client";

import {
  Popover,
  PopoverBackdrop,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import { tree } from "next/dist/build/templates/app-page";
import Link from "next/link";
import { BiChevronDown } from "react-icons/bi";
import { useDisconnect, useActiveWallet } from "thirdweb/react";

export default function UserWidget() {
  const { disconnect } = useDisconnect();
  const wallet = useActiveWallet();

  const address = wallet?.getAccount()?.address;

  const shortAddress = address?.slice(0, 3) + "..." + address?.slice(-4);

  const handleDisconnect = () => {
    if (!wallet) return;
    disconnect(wallet);
  };

  return (
    <Popover className="relative">
      <PopoverButton className="flex items-center gap-3 text-sm px-4 py-2 border rounded-lg border-white/10">
        <span className="size-6 flex rounded-full bg-white/30"></span>
        <div>{shortAddress}</div>
        <BiChevronDown />
      </PopoverButton>
      {/* Panel */}
      <PopoverBackdrop className="fixed inset-0" />
      <PopoverPanel
        className="absolute right-0 w-48 bg-black border rounded-lg border-white/10 shadow-lg"
        anchor={{ gap: 8, to: "bottom end" }}
      >
        <ul className="text-sm divide-y divide-white/10">
          <li>
            <Link href={"/dashboard"} className="flex p-2 hover:bg-white/5">
              Dashboard
            </Link>
          </li>

          <li>
            <button
              onClick={handleDisconnect}
              className="flex w-full text-red-500 p-2 hover:bg-red-500/10"
            >
              Logout
            </button>
          </li>
        </ul>
      </PopoverPanel>
    </Popover>
  );
}
