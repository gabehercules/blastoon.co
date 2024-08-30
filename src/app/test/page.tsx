"use client";

import { useState } from "react";
import { calculateCheese, updateCheese } from "@/utils/cheese";
import { getUserCheese } from "@/database/read/get-user-cheese";

export default function Page() {
  const [cheese, setCheese] = useState(0);
  const [loading, setLoading] = useState(false);

  //   const fakeUpgrade = async () => {
  //     const body = {
  //       event: {
  //         data: {
  //           block: {
  //             logs: [
  //               {
  //                 topics: [
  //                   "0x0c3fdcacbee530581c67c89a851ff8052aa367c589919df3056398ce311a237d",
  //                 ],
  //                 transaction: {
  //                   from: {
  //                     address: "0x97a3db86574a8ab10a8c141f3f6b7dc34cb3ade5",
  //                   },
  //                 },
  //               },
  //             ],
  //           },
  //         },
  //       },
  //     };

  //     await fetch("/api/webhooks/upgrade", {
  //       method: "POST",
  //       body: JSON.stringify(body),
  //     });
  //   };

  const calculateUserCheese = async () => {
    setLoading(true);

    const actualCheese = await getUserCheese(
      "0x97a3db86574a8ab10a8c141f3f6b7dc34cb3ade5"
    );
    setCheese(actualCheese as number);

    const cheese = await calculateCheese(
      "fe29c40c-446c-4daa-94ce-66bbf6fb5c89"
    );

    updateCheese("fe29c40c-446c-4daa-94ce-66bbf6fb5c89", cheese);

    setCheese(cheese);

    setLoading(false);
  };

  return (
    <div className="p-6">
      <h1 className="mb-4">Test fake upgrade</h1>
      <div>
        <button
          onClick={calculateUserCheese}
          className="p-3 rounded-lg bg-brand-yellow text-yellow-950 font-bold"
        >
          {loading ? "Loading..." : "Calculate Cheese"}
        </button>
        <div>$CHEESE: {cheese}</div>
      </div>
    </div>
  );
}
