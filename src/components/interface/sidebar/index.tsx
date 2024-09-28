"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Logo from "@/components/elements/logo";
import { GiMagicPortal, GiPortal } from "react-icons/gi";
import ConnectButton from "@/components/elements/connect-button";
import UserWidget from "@/components/elements/user/user-widget";
import { signOut, useSession } from "next-auth/react";
import { BiGridAlt, BiLogOut, BiSliderAlt, BiUserCircle } from "react-icons/bi";
import {
  TbLayoutGrid,
  TbCoins,
  TbSwords,
  TbTrophy,
  TbSword,
} from "react-icons/tb";

export default function Sidebar() {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  return (
    <aside className="sidebar flex flex-col bg-gray-foreground border-r border-border-gray">
      <div className="p-4 border-b border-border-gray">
        <Logo />
      </div>

      {/* user widget */}
      <div className="flex items-center justify-end gap-4">
        {!status && <ConnectButton>Connect</ConnectButton>}
      </div>

      <div className="p-4 border-b border-border-gray">
        <div>
          <span className="flex text-xs text-neutral-400 mb-3 px-3">
            Navigate
          </span>
          <ul className="flex flex-col gap-1">
            {navigate.map((item, i) => {
              const currentPath = pathname.startsWith(item.href);
              return (
                <li key={i}>
                  <Link
                    href={item.href}
                    className={`${
                      currentPath && "text-brand-yellow bg-brand-yellow/5"
                    } flex gap-2 items-center text-sm p-3 rounded-lg hover:bg-gray-foreground hover:text-brand-yellow transition-all duration-200`}
                  >
                    <item.Icon size={20} />
                    {item.label}
                    {item.badge && (
                      <span className="inline-flex leading-none text-xs uppercase font-bold p-[2px] rounded bg-brand-yellow text-yellow-900">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* divider */}

      <div className="p-4 border-b border-border-gray">
        <div>
          <span className="flex text-xs text-neutral-400 mb-3 px-3">
            Explore
          </span>
          <ul className="flex flex-col gap-1">
            {explore.map((item, i) => {
              const currentPath = pathname.startsWith(item.href);
              return (
                <li key={i}>
                  <Link
                    href={item.href}
                    className={`${
                      currentPath && "text-brand-yellow bg-brand-yellow/5"
                    } flex gap-2 items-center text-sm p-3 rounded-lg hover:bg-gray-foreground hover:text-brand-yellow transition-all duration-200`}
                  >
                    <item.Icon size={20} />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* divider */}

      <div className="p-4 border-b border-border-gray">
        <div>
          <span className="flex text-xs text-neutral-400 mb-3 px-3">
            Menage
          </span>
          <ul className="flex flex-col gap-1">
            {manage.map((item, i) => {
              const currentPath = pathname.startsWith(item.href);
              return (
                <li key={i}>
                  <Link
                    href={item.href}
                    className={`${
                      currentPath && "text-brand-yellow bg-brand-yellow/5"
                    } flex gap-2 items-center text-sm p-3 rounded-lg hover:bg-gray-foreground hover:text-brand-yellow transition-all duration-200`}
                  >
                    <item.Icon size={20} />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* sign out */}

      <div className="flex-1 content-end p-4">
        <button
          onClick={() =>
            signOut({
              redirect: true,
            })
          }
          className="w-full flex items-center gap-2 p-3 text-sm rounded-lg bg-red-500/5 text-red-500 hover:bg-red-500/10"
        >
          <BiLogOut size={20} />
          Disconnect
        </button>
      </div>
    </aside>
  );
}

const navigate = [
  {
    label: "Dashboard",
    href: "/dashboard",
    Icon: TbLayoutGrid,
  },
  {
    label: "Marketplace",
    href: "/marketplace",
    Icon: TbCoins,
  },
  {
    label: "Guilds",
    href: "/guilds",
    Icon: TbSwords,
    badge: "soon",
  },
  {
    label: "Leaderboards",
    href: "/leaderboards",
    Icon: TbTrophy,
  },
];

const explore = [
  {
    label: "Active Portals",
    href: "/portals",
    Icon: GiMagicPortal,
  },
  {
    label: "Raids",
    href: "/raids",
    Icon: TbSword,
  },
];

const manage = [
  {
    label: "Profile",
    href: "/profile",
    Icon: BiUserCircle,
  },
  {
    label: "Inventory",
    href: "/inventory",
    Icon: BiGridAlt,
  },
  {
    label: "Settings",
    href: "/settings",
    Icon: BiSliderAlt,
  },
  // {
  //   label: "Docs",
  //   href: "/docs",
  //   Icon: TbSword,
  // },
  // {
  //   label: "Help",
  //   href: "/help",
  //   Icon: TbSword,
  // },
];
