"use client";

import Image from "next/image";
import cheeseCoinIcon from "/public/cheese-coin.png";
import cheeseTokenIcon from "/public/cheese-token.png";
import { getUserCheese } from "@/database/read/get-user-cheese";
import { useEffect, useState } from "react";

export default function CheeseBalance({ address }: { address: string }) {
  const [cheese, setCheese] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getUserCheese(address)
      .then((cheese) => {
        setCheese(cheese as number);
      })
      .catch((error) => {
        console.error("Failed to fetch user cheese", error);
      })
      .finally(() => setLoading(false));
  }, [cheese]);

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-3">
        <Image
          src={cheeseCoinIcon}
          width={22}
          height={22}
          alt={"Cheese Coin"}
        />
        <span className="font-rowdies text-sm font-bold">{cheese}</span>
      </div>

      <div className="flex items-center gap-3">
        <Image
          src={cheeseTokenIcon}
          width={22}
          height={22}
          alt={"Cheese Coin"}
        />
        <span className="font-rowdies text-sm font-bold">0</span>
      </div>
    </div>
  );
}
