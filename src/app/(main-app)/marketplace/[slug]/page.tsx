"use client";

import { useState } from "react";
import Image from "next/image";

import Link from "next/link";
import { BiChevronLeft } from "react-icons/bi";
import { useQuery } from "@tanstack/react-query";
import { getMarketItem } from "@/database/read/get-market-item";
import { useSession } from "next-auth/react";
import { CustomUser } from "@/components/interface/topbar/cheese-balance";
import BuyItemForm from "@/components/elements/forms/buy-item-form";

export default function MarketplaceItem({
  params,
}: {
  params: { slug: string };
}) {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const user = session?.user as CustomUser;

  // ================== Fetch Card Pack Details ==================

  console.log(params.slug);

  const {
    data: marketItem,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["market-item", params.slug],
    queryFn: async () => getMarketItem(params.slug),
  });

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  if (!marketItem) return <div>Not found</div>;

  return (
    <div className="max-w-4xl flex flex-col gap-4 m-auto">
      {/* breadcrumbs */}
      <div>
        <Link
          href="/marketplace"
          className="w-fit flex items-center gap-1 text-sm text-neutral-400 hover:text-brand-yellow"
        >
          <BiChevronLeft size={18} /> Back to Marketplace
        </Link>
      </div>

      {/* pack details */}

      <div className="flex gap-8">
        <div className="w-[720px] bg-black/50 border border-border-gray rounded-lg">
          <Image
            src={marketItem.image}
            width={512}
            height={512}
            alt="Image Card Pack"
            className="w-full h-full p-4 m-auto object-contain"
          />
        </div>

        {/* details */}
        <div className="w-full">
          <div className="flex-1 space-y-4 mb-6">
            <h2 className="text-xl font-bold">{marketItem.name}</h2>
            <p>{marketItem.description}</p>
          </div>
          <div className="">
            <BuyItemForm marketItem={marketItem} user={user} />
          </div>
        </div>
      </div>
    </div>
  );
}
