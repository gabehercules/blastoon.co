"use client";

import Image from "next/image";
import cheeseCoin from "/public/cheese-coin.png";
import { BiPlus } from "react-icons/bi";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { getUserCheese } from "@/database/read/get-user-cheese";

export interface CustomUser {
  id: string;
  address: string;
}

export default function CheeseBalance() {
  const { data: session, status } = useSession();
  const user = session?.user as CustomUser;

  const {
    data: cheese,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["user-cheese"],
    queryFn: async () => getUserCheese(user.id),
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
    <div className="flex gap-2 items-center h-full px-3">
      <Image src={cheeseCoin} width={20} height={20} alt="Cheese Coin Icon" />
      <span className="flex text-sm font-bold">
        {cheese?.toLocaleString("en")}
      </span>
      <button className="bg-brand-yellow/20 text-brand-yellow p-1 rounded">
        <BiPlus size={13} />
      </button>
    </div>
  );
}
