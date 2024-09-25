"use client";

import Image from "next/image";
import superCheeseCoin from "/public/super-cheese.png";
import { BiPlus } from "react-icons/bi";
import { CustomUser } from "./cheese-balance";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { getUserSuperCheese } from "@/database/read/get-user-supercheese";

export default function SuperCheeseBalance() {
  const { data: session, status } = useSession();
  const user = session?.user as CustomUser;

  const {
    data: superCheese,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["super-cheese"],
    queryFn: async () => getUserSuperCheese(user.id),
    staleTime: 1000 * 6, // 6 seconds
  });

  if (error) {
    return <div>Error...</div>;
  }

  if (isLoading) {
    return (
      <div className="h-full px-3 flex items-center">
        <div className="w-[120px] h-[16px] bg-white/10 rounded animate-pulse" />
      </div>
    );
  }

  return (
    <div className="flex gap-2 items-center h-full px-3 border-border-gray">
      <Image
        src={superCheeseCoin}
        width={20}
        height={20}
        alt="Super Cheese Coin Icon"
      />
      <span className="flex text-sm font-bold">
        {superCheese?.toLocaleString("en")}
      </span>
      <button className="bg-brand-green/20 text-brand-green p-1 rounded">
        <BiPlus size={13} />
      </button>
    </div>
  );
}
