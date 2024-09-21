"use client";

import CardPacks from "@/components/elements/card-packs";
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

  console.log(cardPacks);

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
          packImg={pack.image}
          slug={pack.slug}
          packTitle={pack.name}
          itemPrice={pack.itemPrice}
        />
      ))}
    </div>
  );
}
