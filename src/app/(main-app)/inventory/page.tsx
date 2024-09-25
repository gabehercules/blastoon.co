"use client";

import { CustomUser } from "@/components/interface/topbar/cheese-balance";
import { getUserCardPacks } from "@/database/read/user-cardpacks";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export default function InventoryPage() {
  const { data: session } = useSession();

  const user = session?.user as CustomUser;

  const {
    data: inventory,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["user-cardpacks"],
    queryFn: async () => getUserCardPacks(user.id),
  });

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="">
      <h1 className="font-bold mb-4">Your Card Packs</h1>
      <div className="grid grid-cols-6 gap-4">
        {inventory?.map((item, i) => (
          <div
            key={i}
            className="bg-gray-foreground rounded-lg border border-border-gray"
          >
            <div className="relative">
              <img
                src={item.item.image}
                className="size-[200px] w-full object-contain border-b border-border-gray"
              />
              <div className="absolute top-2 left-2 size-7 flex items-center justify-center bg-brand-yellow text-yellow-950 p-1 text-sm font-semibold rounded">
                {item.quantity}
              </div>
            </div>
            <div className="p-3">
              <span className="font-semibold">{item.item.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
