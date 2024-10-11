"use client";

import { useState } from "react";

import Image from "next/image";
import cheeseIcon from "/public/cheese-coin.png";
import superCheeseIcon from "/public/super-cheese.png";
import ethIcon from "/public/eth-icon.png";
import { MarketItems } from "@prisma/client";

export default function ItemInfoStep({
  marketItem,
}: {
  marketItem: MarketItems;
}) {
  const [quantity, setQuantity] = useState(1);

  const handleIncrementQty = () => {
    setQuantity((prev) => (prev < 10 ? prev + 1 : prev));
  };

  const handleDecrementQty = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  };

  return (
    <div>
      <div className="flex border border-border-gray rounded-xl mb-4 divide-x divide divide-border-gray">
        <button
          type="button"
          onClick={handleDecrementQty}
          className="flex items-center justify-center w-[46px] p-3"
        >
          -
        </button>
        <input
          name="quantity"
          id="quantity"
          type="number"
          className="flex-1 p-3 bg-gray-background focus-visible:outline-none font-bold text-center"
          value={quantity}
          readOnly
          min={1}
          max={10}
        />
        <button
          type="button"
          onClick={handleIncrementQty}
          className="flex items-center justify-center w-[46px] p-3"
        >
          +
        </button>
      </div>

      {/* button division */}

      <div className="flex flex-col gap-4">
        {marketItem.cheesePrice && (
          <button
            type="submit"
            id="cheese-checkout"
            disabled={marketItem.supply === 0}
            className="flex items-center justify-between text-start p-3 font-bold rounded-xl bg-brand-yellow/20 border-2 border-brand-yellow disabled:opacity-30 pointer-events-none"
          >
            Buy with Cheese
            <span className="flex items-center gap-2 text-brand-yellow">
              <Image
                src={cheeseIcon}
                width={18}
                height={18}
                alt="cheese icon"
              />
              {marketItem.cheesePrice.toLocaleString("en-US")}
            </span>
          </button>
        )}
        {marketItem.superCheesePrice && (
          <button
            type="submit"
            id="supercheese-checkout"
            disabled={marketItem.supply === 0}
            className="flex items-center justify-between text-start p-3 font-bold rounded-xl bg-brand-green/20 border-2 border-brand-green disabled:opacity-30 pointer-events-none"
          >
            Buy with Super Cheese
            <span className="flex items-center gap-2 text-brand-green">
              <Image
                src={superCheeseIcon}
                width={18}
                height={18}
                alt="cheese icon"
              />
              {marketItem.superCheesePrice.toLocaleString("en-US")}
            </span>
          </button>
        )}
        {marketItem.ethPrice && (
          <button
            disabled
            id="eth-checkout"
            className="flex items-center justify-between text-start p-3 font-bold rounded-xl bg-[#627EEA]/20 border-2 border-[#627EEA] disabled:opacity-30 pointer-events-none"
          >
            <div className="flex items-center gap-2">
              Buy with ETH{" "}
              <span className="bg-[#627EEA] text-xs font-normal rounded py-[2px] px-1">
                soon
              </span>
            </div>
            <span className="flex items-center gap-2 text-[#627EEA]">
              <Image src={ethIcon} width={18} height={18} alt="cheese icon" />
              {marketItem.ethPrice}
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
