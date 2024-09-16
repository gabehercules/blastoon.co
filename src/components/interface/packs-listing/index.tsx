"use client";

import CardPacks from "@/components/elements/card-packs";
import commonPack from "/public/pack-common.png";
import { useQuery } from "@tanstack/react-query";
import { getCardPacks } from "@/database/read/get-cardpacks";

export default function PacksListing() {
  const {
    data: cardPacks,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["card-packs"],
    queryFn: async () => getCardPacks(),
    _optimisticResults: "optimistic",
  });

  if (isError) {
    return <div>Error...</div>;
  }

  if (!cardPacks) {
    return <div>No cardpacks</div>;
  }

  return (
    <div className="flex items-center gap-4">
      {cardPacks.map((pack, i) => (
        <CardPacks
          key={i}
          packImg={commonPack}
          slug={pack.slug}
          packCheesePrice={pack.cheesePrice}
          packEthPrice={pack.ethPrice}
          packSuperCheesePrice={pack.superCheesePrice}
          packTitle={pack.packType}
        />
      ))}
    </div>
  );
}
