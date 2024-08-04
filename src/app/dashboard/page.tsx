import "@/styles/dashboard.css";

import blastoonTemp from "/public/blastoon-760_temp.webp";
import Image from "next/image";

const getNFTsByOwner = async () => {
  const account = "0x61d86e45b920bb27c6afbf4d3da64ef5dd9699c9";
  const blasttoonContract = "0x36af682901Dcb86D9Cff0D0e602857E3e07aA80D";

  const limit = 20;
  try {
    const response = await fetch(
      `https://blastapi.nftscan.com/api/v2/account/own/${account}?contract_address=${blasttoonContract}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          "x-api-key": process.env.NEXT_PUBLIC_NFTSCAN_API_KEY as string,
        },
      }
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

// import { useActiveWallet } from "thirdweb/react";
import UserAvatar from "@/components/elements/user/user-avatar";

export default async function Dashboard() {
  const { data: blastToon } = await getNFTsByOwner();

  const { content: nfts } = blastToon;

  // console.log("NFTs owned by this account", collections);

  return (
    <div className="dashboard-layout">
      {/* profile info */}
      <div className="dashboard-main flex flex-col space-y-4">
        {/* profile header */}
        <div className="flex gap-3">
          {/* profile pic */}
          <div className="size-52 rounded-xl overflow-hidden">
            <UserAvatar avatarSrc={blastoonTemp} />
          </div>

          {/* user details */}
          <div className="flex-1 flex gap-4 divide-x divide-white/20 bg-white/10">
            {/* --- */}
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h1 className="text-white text-xl font-bold">
                  0x12ds434dffadsd
                </h1>
                <span className="text-white text-sm">aka: Zneider.eth</span>
              </div>
              <p className="text-white text-sm">Joined: 2021</p>
              <p className="text-white text-sm">Location: Earth</p>
              <p className="text-white text-sm">Bio: Some bio here</p>
            </div>
            {/* --- */}
            <div className="w-[20%] max-w-52 bg-white/10">
              <span>$CHEESE 56.500</span>
              <button>Buy $CHEESE</button>
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
        <div className="flex-1 bg-white/10 p-3">
          <h1>My NFTs</h1>
          <div>
            <ul className="grid grid-cols-5 gap-5">
              {nfts.map((item: any) => (
                <li
                  key={item.token_id}
                  className="p-3 border rounded-lg border-white/10 bg-black/60"
                >
                  <p>Contract name: {item.contract_name}</p>
                  <p>Token ID: {item.token_id}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="dashboard-sidebar bg-white/10"></div>
    </div>
  );
}
