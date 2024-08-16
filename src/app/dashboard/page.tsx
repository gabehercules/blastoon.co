import "@/styles/dashboard.css";

import blastoonTemp from "/public/blastoon-760_temp.webp";
import cheeseCoin from "/public/cheese-coin.png";
import Image from "next/image";

import UserAvatar from "@/components/elements/user/user-avatar";
import {
  getNFTsByAddress,
  getNFTsByUserId,
  verifyNFTOwnership,
} from "@/utils/get-nfts-by-address";
import UserNFTsList from "@/components/interface/user-nfts-section";
import { getUserCheese } from "@/database/read/get-user-cheese";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import VerifyCheese from "@/components/elements/verify-cheese";
import prisma from "@/database/prisma";
import { firstVerify } from "@/utils/first-verify";
import { calculateCheese, updateCheese } from "@/utils/cheese";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <div>Not authenticated</div>;
  }

  const { id, address } = session.user;

  const firstVerified = await firstVerify(id, address);

  console.log("First verified", firstVerified);

  const nfts = await getNFTsByUserId(Number(id));
  // const nfts = await getNFTsByUserId(21);

  const cheese = await getUserCheese(address);

  if (cheese === null) {
    return <div>Failed to fetch user cheese</div>;
  }

  // console.log("Session", session);

  return (
    <div className="dashboard-layout">
      {/* profile info */}
      <div className="dashboard-main flex flex-col space-y-4 overflow-hidden">
        {/* profile header */}
        <div className="flex gap-3">
          {/* profile pic */}
          <div className="size-52 rounded-xl overflow-hidden">
            <UserAvatar address={session.user.address} />
          </div>

          {/* user details */}
          <div className="flex-1 flex gap-4 p-5 rounded-lg bg-white/5">
            {/* --- */}
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h1 className="text-white text-2xl font-rowdies font-bold mb-3">
                  {session.user.address.slice(0, 4) +
                    "..." +
                    session.user.address.slice(-4)}
                </h1>
              </div>
              <div className="flex items-center gap-3">
                <Image
                  src={cheeseCoin}
                  height={32}
                  width={32}
                  alt="Cheese Coins"
                />
                <span className="text-xl font-rowdies font-bold">
                  {Number(cheese)}
                </span>
              </div>
            </div>
            {/* --- */}
            <div className="w-[20%] max-w-52 pl-5">
              {/* <div className="flex items-center gap-3">
                <Image
                  src={cheeseCoin}
                  height={32}
                  width={32}
                  alt="Cheese Coins"
                />
                <span className="text-xl font-rowdies font-bold">
                  {Number(cheese)}
                </span>
              </div> */}
            </div>
          </div>
        </div>

        {/* prfile tabs */}
        {/* <div className="bg-white/10 p-3">
          <ul className="flex gap-3">
            <li className="text-white">Profile</li>
            <li className="text-white">Collection</li>
            <li className="text-white">Achievements</li>
            <li className="text-white">My NFTs</li>
          </ul>
        </div> */}

        {/* some content */}
        {nfts && nfts.length > 0 ? (
          <div className="flex-1 flex flex-col rounded-lg bg-white/5 p-6 overflow-hidden">
            <h1 className="font-rowdies text-lg font-bold mb-4">My NFTs</h1>
            <div className="overflow-y-auto">
              <UserNFTsList nfts={nfts} />
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center p-5 bg-neutral-950">
            {/* put an nice image here */}
            <h3 className="text-xl font-bold mb-3">
              You dont own a Blast Toon
            </h3>
            <p className="text-neutral-500">
              Buy a Blast Toon to start collecting $CHEESE
            </p>
            <div className="flex flex-col gap-2 items-center mt-4">
              <a
                href="https://blur.io/blast/collection/blastoon-co-pass"
                target="_blank"
                className="flex bg-brand-yellow text-yellow-950 font-bold px-4 py-2 rounded-lg"
              >
                Buy on Blur
              </a>
              <span>or</span>
              <a
                href="https://blur.io/blast/collection/blastoon-co-pass"
                target="_blank"
                className="flex border-brand-yellow border-2 text-brand-yellow font-bold px-4 py-2 rounded-lg"
              >
                Check for ownership
              </a>
            </div>
          </div>
        )}
      </div>

      <div className="dashboard-sidebar bg-white/10"></div>
    </div>
  );
}
