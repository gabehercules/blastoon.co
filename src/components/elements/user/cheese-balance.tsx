"use client";

import Image from "next/image";
import cheeseCoinIcon from "/public/cheese-coin.png";
import superCheeseIcon from "/public/super-cheese.png";
import cardIcon from "/public/card-icon.png";
import { getUserCheese } from "@/database/read/get-user-cheese";
import { useEffect, useState } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getUserSuperCheese } from "@/database/read/get-user-supercheese";
import { getUserCardPacks } from "@/utils/cardPacks";

export default function CheeseBalance({
  address,
  id,
}: {
  address: string;
  id: string;
}) {
  const [cheese, setCheese] = useState(0);
  const [superCheese, setSuperCheese] = useState(0);
  const [cardPacks, setCardPacks] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    getUserCheese(address)
      .then((cheese) => {
        setCheese(cheese as number);
      })
      .catch((error) => {
        console.error("Failed to fetch user cheese", error);
      });

    getUserSuperCheese(id)
      .then((superCheese) => {
        setSuperCheese(superCheese as number);
      })
      .catch((error) => {
        console.error("Failed to fetch super cheese", error);
      });

    getUserCardPacks(id)
      .then((cardPacks) => {
        setCardPacks(cardPacks as number);
      })
      .catch((error) => {
        console.error("Failed to fetch card packs", error);
      });

    setLoading(false);
  }, []);

  return (
    <TooltipProvider delayDuration={300}>
      <div className="flex gap-4 sm:hidden">
        <Tooltip>
          <TooltipTrigger className="flex items-center gap-3">
            <Image src={cardIcon} width={22} height={22} alt={"Cheese Coin"} />
            {cardPacks == null ? (
              <span className="w-[10px] h-[18px] font-nicesugar text-sm font-bold bg-white/70 rounded-lg animate-pulse" />
            ) : (
              <span className="font-nicesugar text-sm font-bold">
                {cardPacks.toLocaleString("en")}
              </span>
            )}
          </TooltipTrigger>
          <TooltipContent>
            <p className="max-w-[120px] text-center font-nicesugar">
              Your available <span className="text-[#ad5e5a]">Card Packs</span>
            </p>
          </TooltipContent>
        </Tooltip>

        {/* SEPARATOR */}

        <Tooltip>
          <TooltipTrigger className="flex items-center gap-3">
            <Image
              src={cheeseCoinIcon}
              width={22}
              height={22}
              alt={"Cheese Coin"}
            />
            {cheese == null ? (
              <span className="w-[65px] h-[18px] font-nicesugar text-sm font-bold bg-white/70 rounded-lg animate-pulse" />
            ) : (
              <span className="font-nicesugar text-sm font-bold">
                {cheese.toLocaleString("en")}
              </span>
            )}
          </TooltipTrigger>
          <TooltipContent>
            <p className="max-w-[120px] text-center font-nicesugar">
              Your current{" "}
              <span className="text-brand-yellow">$CHEESE Points</span>
            </p>
          </TooltipContent>
        </Tooltip>

        {/* SEPARATOR */}

        <Tooltip>
          <TooltipTrigger className="flex items-center gap-3">
            <Image
              src={superCheeseIcon}
              width={22}
              height={22}
              alt={"Cheese Coin"}
            />
            {superCheese == null ? (
              <span className="w-[65px] h-[18px] font-nicesugar text-sm font-bold bg-white/70 rounded-lg animate-pulse" />
            ) : (
              <span className="font-nicesugar text-sm font-bold">
                {superCheese.toLocaleString("en")}
              </span>
            )}
          </TooltipTrigger>
          <TooltipContent>
            <p className="max-w-[120px] text-center font-nicesugar">
              Your current{" "}
              <span className="text-brand-green">SUPER $CHEESE</span>
            </p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
