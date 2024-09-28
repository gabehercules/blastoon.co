"use client";

import Image, { StaticImageData } from "next/image";

import cheeseCoinIcon from "/public/cheese-coin.png";
import superCheese from "/public/super-cheese.png";
import { FaEthereum } from "react-icons/fa6";
import Link from "next/link";

interface CardPacksProps {
  packImg: StaticImageData | string;
  slug: string;
  packTitle: string;
  cheesePrice?: number | null;
  supercheesePrice?: number | null;
  ethPrice?: number | null;
}

export default function CardPacks({
  packImg,
  slug,
  packTitle,
  cheesePrice,
  supercheesePrice,
  ethPrice,
}: CardPacksProps) {
  return (
    <Link
      href={`/marketplace/${slug}`}
      className="w-[250px] bg-gray-foreground border border-border-gray rounded-lg
            hover:border-brand-yellow/80 hover:ring-inset hover:ring-2 hover:ring-brand-yellow/40 transition-all"
    >
      <div className="w-full size-56">
        <Image
          src={packImg}
          width={200}
          height={200}
          alt={packTitle + " Image"}
          className="m-auto h-full object-contain"
        />
      </div>
      <div className="border-t border-border-gray p-3">
        <p className="text-left mb-3">{packTitle.toLocaleUpperCase()}</p>
        <div className="flex justify-between">
          {/* prices test*/}
          {cheesePrice && (
            <div className="flex items-center gap-2 px-2 py-1 rounded-lg bg-brand-yellow/20 border border-b-2 border-brand-yellow/50">
              <Image
                src={cheeseCoinIcon}
                width={18}
                height={18}
                alt={"cheese-coin"}
              />
              <span className="text-sm font-bold text-brand-yellow">
                {cheesePrice.toLocaleString("en-US")}
              </span>
            </div>
          )}
          {supercheesePrice && (
            <div className="flex items-center gap-2 px-2 py-1 rounded-lg bg-brand-green/20 border border-b-2 border-brand-green/50">
              <Image
                src={superCheese}
                width={18}
                height={18}
                alt={"super-cheese"}
              />
              <span className="text-sm font-bold text-brand-green">
                {supercheesePrice.toLocaleString("en-US")}
              </span>
            </div>
          )}
          {ethPrice && (
            <div className="flex items-center gap-2 rounded-lg px-2 py-1 bg-[#627EEA]/20 text-[#627EEA] border border-b-2 border-[#627EEA]/50">
              <FaEthereum size={16} />
              <span className="text-sm font-bold">{ethPrice}</span>
            </div>
          )}
          {/* prices test */}
        </div>
      </div>
    </Link>
  );
}
