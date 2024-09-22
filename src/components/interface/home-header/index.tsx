"use client";

import ConnectButton from "@/components/elements/connect-button";
import Logo from "@/components/elements/logo";
import UserWidget from "@/components/elements/user/user-widget";
import { useSession } from "next-auth/react";

export default function HomeHeader() {
  const { data: session } = useSession();
  return (
    <header className="home-header flex items-center justify-center px-6 border-b border-border-gray">
      <div className="w-full flex items-center justify-between">
        <div>
          <Logo />
        </div>

        <div>
          {!session ? <ConnectButton>Connect</ConnectButton> : <UserWidget />}
        </div>
      </div>
    </header>
  );
}
