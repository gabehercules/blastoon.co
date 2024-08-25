"use client";
import { useState, useEffect } from "react";
import { getProvider, getUpgrades } from "@/lib/ethers";
import { ethers, EventFilter } from "ethers";
import { createBoostTemp } from "@/database/create/boosts";

export default function Tests() {
  const [events, setEvents] = useState<any[]>([]);

  const handleClick = async () => {
    const provider = await getProvider();

    if (!provider) {
      console.log("NO PROVIDER FOUND");
      return;
    }

    const lastestBlock = await provider.getBlockNumber();

    const btoonContract = "0x36af682901Dcb86D9Cff0D0e602857E3e07aA80D";

    const abi = [
      //   "event Upgrade(uint256 tokenId, address indexed by, uint256 value)",
      //   "event Transfer(address indexed from, address indexed to, uint256 value)",
      "event Boost(address indexed user, address collection, uint256 quantity, uint256 value)",
    ];

    const boostContract = "0x51aAd5867d73c479ce8c59Ae9c9E4bf59D74C4C1";

    const filter: EventFilter = {
      address: "0xa78c8901622c2476fd06d40f90db5973508beffc",
      topics: [
        "0x0c3fdcacbee530581c67c89a851ff8052aa367c589919df3056398ce311a237d",
        null,
      ],
    };
    // const topic = [
    //   "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
    // ];

    const contract = new ethers.Contract(boostContract, abi, provider);

    // contract.on("Upgrade", (tokenId, by, value, event) => {
    //   let data = {
    //     tokenId: parseInt(tokenId, 16),
    //     by,
    //     value,
    //     event,
    //   };

    //   console.log(data);

    //   setEvents((prev) => [...prev, data]);
    // });

    contract.on("Boost", async (user, collection, quantity, value, event) => {
      let data = {
        user,
        collection,
        quantity,
        value,
        event,
      };

      console.log(data);

      await createBoostTemp(user, collection, quantity, value);

      setEvents((prev) => [...prev, data]);
    });

    // const newContract = new ethers.BaseContract(btoonContract, abi, provider);

    // const filters = newContract.filters.Upgrade(
    //   null,
    //   "0xc0C97BB603B540260556D6b3D47228C163451662",
    //   null
    // ).fragment;

    // console.log("Contract", filters);

    // const logs = new ethers.EventLog();
  };

  return (
    <div className="w-full h-full p-8">
      <h2 className="text-lg mb-4 pb-4 font-bold border-b border-white/10">
        Testing page
      </h2>
      <div>
        <button
          onClick={handleClick}
          className="flex px-3 py-2 rounded-lg bg-brand-yellow text-yellow-950"
        >
          Provider and Account
        </button>
        {events.reverse().map((event, index) => (
          <div key={index} className="text-white">
            <div>{event.user}</div>
            <div>{event.collection}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
