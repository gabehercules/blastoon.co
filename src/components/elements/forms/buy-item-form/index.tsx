"use client";

import Image from "next/image";
import React, { useState } from "react";

import cheeseIcon from "/public/cheese-coin.png";
import superCheeseIcon from "/public/super-cheese.png";
import ethIcon from "/public/eth-icon.png";
import { BiLoaderAlt } from "react-icons/bi";

export default function BuyItemForm({
  marketItem,
  user,
}: {
  marketItem: any;
  user: any;
}) {
  const [loading, setLoading] = useState(false);

  const handleBuyItem = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();

    const eventSubmitter = e.nativeEvent as SubmitEvent;

    const formData = new FormData(e.currentTarget);

    const quantity = formData.get("quantity");
    let price;

    switch (eventSubmitter.submitter?.id) {
      case "cheese-checkout":
        price = marketItem.cheesePrice;
        break;
      case "supercheese-checkout":
        price = marketItem.superCheesePrice;
        break;
      case "eth-checkout":
        price = marketItem.ethPrice;
        break;
      default:
        break;
    }
    let totalPrice = Number(price) * Number(quantity);

    // const data = Object.fromEntries(formData.entries());

    // console.log("Form Data", data);

    console.log("Event Submitter", eventSubmitter);

    const data = {
      userId: user.id,
      cardPackId: marketItem.id,
      checkoutMode: eventSubmitter.submitter?.id,
      price: price,
      totalPrice: totalPrice,
      amount: Number(quantity),
    };

    const response = await fetch("/api/marketplace/buy-cardpack", {
      method: "POST",
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    setLoading(false);
    console.log("Response Data", responseData);
  };
  return (
    <form onSubmit={handleBuyItem}>
      <div className="flex border border-border-gray rounded-xl mb-4 divide-x divide divide-border-gray">
        <button
          type="button"
          className="flex items-center justify-center w-[46px] p-3"
        >
          -
        </button>
        <input
          name="quantity"
          id="quantity"
          type="number"
          className="flex-1 p-3 bg-gray-background focus-visible:outline-none font-bold text-center"
          defaultValue="01"
          min={1}
        />
        <button
          type="button"
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
            className="flex items-center justify-between text-start p-3 font-bold rounded-xl bg-brand-yellow/20 border-2 border-brand-yellow"
          >
            Buy with Super Cheese
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
            className="flex items-center justify-between text-start p-3 font-bold rounded-xl bg-brand-green/20 border-2 border-brand-green"
          >
            Buy with Super Cheese
            <span className="flex items-center gap-2 text-brand-green">
              <Image
                src={superCheeseIcon}
                width={18}
                height={18}
                alt="cheese icon"
              />
              {!loading ? (
                marketItem.superCheesePrice.toLocaleString("en-US")
              ) : (
                <BiLoaderAlt size={18} className="animate-spin" />
              )}
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
    </form>
  );
}
