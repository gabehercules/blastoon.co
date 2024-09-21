"use client";

import { useState } from "react";
import Image from "next/image";

import cheeseIcon from "/public/cheese-coin.png";
import superCheeseIcon from "/public/super-cheese.png";
import ethIcon from "/public/eth-icon.png";
import Link from "next/link";
import { BiChevronLeft } from "react-icons/bi";
import { useQuery } from "@tanstack/react-query";
import { getCardPackDetails } from "@/database/read/get-cardpack-details";
import { useSession } from "next-auth/react";
import { CustomUser } from "@/components/interface/topbar/cheese-balance";

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
    data: cardPack,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["cardPack", params.slug],
    queryFn: async () => getCardPackDetails(params.slug),
  });

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  if (!cardPack) return <div>Not found</div>;

  // ============= Form Submit Handler =============

  const handleBuyItem = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();

    const eventSubmitter = e.nativeEvent as SubmitEvent;

    const formData = new FormData(e.currentTarget);

    const quantity = formData.get("quantity");

    // const data = Object.fromEntries(formData.entries());

    // console.log("Form Data", data);

    const data = {
      userId: user.id,
      cardPackId: cardPack.id,
      currency: cardPack.itemPrice.filter(
        (item) => item.currencyType === eventSubmitter.submitter?.id
      )[0].currencyType,
      price: cardPack.itemPrice.filter((item) => item.price)[0].price,
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
    <div className="max-w-5xl flex flex-col gap-4 m-auto">
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
        <div className="bg-black/50 border border-border-gray rounded-lg">
          <Image
            src={cardPack.image}
            width={512}
            height={512}
            alt="Image Card Pack"
            className="w-[364px] p-4 m-auto object-contain"
          />
        </div>

        {/* details */}
        <div className="w-full">
          <div className="flex-1 space-y-4 mb-6">
            <h2 className="text-xl font-bold">{cardPack.name}</h2>
            <p>{cardPack.description}</p>
          </div>
          <div className="">
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
                {cardPack.itemPrice.map((item, i) => {
                  if (item.currencyType === "CHEESE") {
                    return (
                      <button
                        type="submit"
                        id={item.currencyType}
                        className="flex items-center justify-between text-start p-3 font-bold rounded-xl bg-brand-yellow/20 border-2 border-brand-yellow"
                        key={i}
                      >
                        Buy with Super Cheese
                        <span className="flex items-center gap-2 text-brand-yellow">
                          <Image
                            src={cheeseIcon}
                            width={18}
                            height={18}
                            alt="cheese icon"
                          />
                          {item.price.toLocaleString("en-US")}
                        </span>
                      </button>
                    );
                  }

                  if (item.currencyType === "SUPER_CHEESE") {
                    return (
                      <button
                        type="submit"
                        id={item.currencyType}
                        className="flex items-center justify-between text-start p-3 font-bold rounded-xl bg-brand-green/20 border-2 border-brand-green"
                        key={i}
                      >
                        Buy with Super Cheese
                        <span className="flex items-center gap-2 text-brand-green">
                          <Image
                            src={superCheeseIcon}
                            width={18}
                            height={18}
                            alt="cheese icon"
                          />
                          {item.price.toLocaleString("en-US")}
                        </span>
                      </button>
                    );
                  }

                  if (item.currencyType === "ETH") {
                    return (
                      <button
                        disabled
                        id={item.currencyType}
                        className="flex items-center justify-between text-start p-3 font-bold rounded-xl bg-[#627EEA]/20 border-2 border-[#627EEA] disabled:opacity-30 pointer-events-none"
                        key={i}
                      >
                        <div className="flex items-center gap-2">
                          Buy with ETH{" "}
                          <span className="bg-[#627EEA] text-xs font-normal rounded py-[2px] px-1">
                            soon
                          </span>
                        </div>
                        <span className="flex items-center gap-2 text-[#627EEA]">
                          <Image
                            src={ethIcon}
                            width={18}
                            height={18}
                            alt="cheese icon"
                          />
                          {item.price}
                        </span>
                      </button>
                    );
                  }
                })}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
