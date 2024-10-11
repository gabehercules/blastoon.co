"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ItemInfoStep from "./step-item-details";
import CartConfirmStep from "./step-cart-confirm";
import { MarketItems } from "@prisma/client";
import { CustomUser } from "@/components/interface/topbar/cheese-balance";

export interface PurchaseDetails {
  userId: string;
  itemId: string;
  checkoutMode: string;
  price: number;
  totalPrice: number;
  amount: number;
}

export default function BuyItemForm({
  marketItem,
  user,
}: {
  marketItem: MarketItems;
  user: CustomUser;
}) {
  const router = useRouter();
  const [puchaseDetails, setPurchaseDetails] = useState<PurchaseDetails>();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"success" | "failed">();
  const [message, setMessage] = useState<string>();

  const handleBuyItem = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const eventSubmitter = e.nativeEvent as SubmitEvent;

    const formData = new FormData(e.currentTarget);

    const quantity = formData.get("quantity");
    let price;

    // console.log("price", price);

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

    // console.log("price 2", price);
    // const data = Object.fromEntries(formData.entries());

    // console.log("Form Data", data);

    // console.log("Event Submitter", eventSubmitter);

    const submitterId = eventSubmitter.submitter?.id;

    const data = {
      userId: user.id,
      itemId: marketItem.id,
      checkoutMode: submitterId as string,
      price: price as number,
      totalPrice: totalPrice,
      amount: Number(quantity),
    };

    // console.log("Data", data);

    setPurchaseDetails(data);

    if (puchaseDetails) {
      setLoading(true);

      const response = await fetch("/api/marketplace/buy-cardpack", {
        method: "POST",
        body: JSON.stringify(puchaseDetails),
      });
      const responseData = await response.json();

      if (!response.ok) {
        console.error("Failed to buy item", responseData);
        setLoading(false);
        setStatus("failed");
        setMessage(responseData.message);
        return;
      }

      console.log("Response Data", responseData);

      setLoading(false);
      setStatus("success");
      // router.push("/marketplace");
    }
  };

  const handleReset = () => {
    setPurchaseDetails(undefined);
  };

  if (status === "success") {
    return (
      <button
        onClick={() => router.push("/marketplace")}
        className="w-full text-center p-3 font-bold rounded-xl bg-brand-yellow/20 border-2 border-brand-yellow/50 text-brand-yellow hover:bg-brand-yellow/30 transition-all duration-200"
      >
        Success! Go Back to Marketplace
      </button>
    );
  }

  if (status === "failed") {
    return (
      <>
        <button
          onClick={() => router.push("/marketplace")}
          className="w-full text-center p-3 font-bold rounded-xl bg-red-500/20 border-2 border-red-500/50 text-red-500 hover:bg-red-500/30 transition-all duration-200"
        >
          Failed! Go Back to Marketplace
        </button>
        <p className="mt-2 bg-red-500/10 p-4 rounded-xl text-red-500 text-sm">
          {message}
        </p>
      </>
    );
  }

  return (
    <form onSubmit={handleBuyItem} onReset={handleReset}>
      {!puchaseDetails ? (
        <ItemInfoStep marketItem={marketItem} />
      ) : (
        <CartConfirmStep purchaseDetails={puchaseDetails} isLoading={loading} />
      )}
    </form>
  );
}

// improvements:
// - use zod for form validation
// - use jotai for state management across steps
