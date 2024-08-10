"use client";
import "@/styles/dashboard.css";

import blastoonTemp from "/public/blastoon-760_temp.webp";
import Image from "next/image";

// import { useActiveWallet } from "thirdweb/react";
import UserAvatar from "@/components/elements/user/user-avatar";
import { getNFTsByAddress } from "@/utils/get-nfts-by-address";
import UserNFTsSection from "@/components/interface/user-nfts-section";
import { useActiveAccount } from "thirdweb/react";
import { useEffect, useState } from "react";
import { getUserCheese } from "@/database/read/get-user-cheese";

export default function Dashboard() {
  const [nftsList, setNftsList] = useState([]);
  const [cheese, setCheese] = useState(0);

  const activeAccount = useActiveAccount();
  const address = activeAccount?.address;

  console.log("Active account", address);

  useEffect(() => {
    if (!address) return;

    (async () => {
      const { data: blastToon } = await getNFTsByAddress(address);
      const { content: nfts } = blastToon;
      setNftsList(nfts);

      console.log("Fetching cheese points for", address);
      const cheesePoints = await getUserCheese(address);

      console.log("Cheese points", cheesePoints);

      setCheese(cheesePoints as number);
    })();
  }, [address]);

  if (!address) return <div>No account</div>;

  // console.log("NFTs owned by this account", collections);

  return (
    <div className="dashboard-layout">
      {/* profile info */}
      <div className="dashboard-main flex flex-col space-y-4 overflow-hidden">
        {/* profile header */}
        <div className="flex gap-3">
          {/* profile pic */}
          <div className="size-52 rounded-xl overflow-hidden">
            <UserAvatar address={address} />
          </div>

          {/* user details */}
          <div className="flex-1 flex gap-4 divide-x divide-white/20 bg-white/10">
            {/* --- */}
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h1 className="text-white text-xl font-bold">
                  {address.slice(0, 4) + "..." + address.slice(-4)}
                </h1>
              </div>
            </div>
            {/* --- */}
            <div className="w-[20%] max-w-52 bg-white/10">
              <span>$CHEESE {cheese}</span>
              {/* <button>Buy $CHEESE</button> */}
            </div>
          </div>
        </div>

        {/* prfile tabs */}
        <div className="bg-white/10 p-3">
          <ul className="flex gap-3">
            <li className="text-white">Profile</li>
            <li className="text-white">Collection</li>
            <li className="text-white">Achievements</li>
            <li className="text-white">My NFTs</li>
          </ul>
        </div>

        {/* some content */}
        <UserNFTsSection nfts={nftsList} />
      </div>

      <div className="dashboard-sidebar bg-white/10"></div>
    </div>
  );
}
