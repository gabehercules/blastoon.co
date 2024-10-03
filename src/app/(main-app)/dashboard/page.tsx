import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

import UserAvatar from "@/components/elements/user/user-avatar";

import { firstVerify } from "@/utils/first-verify";
import { BiLogoDiscordAlt } from "react-icons/bi";

import cheesePointsIcon from "/public/cheese-coin.png";
import superCheeseIcon from "/public/super-cheese.png";
import "@/styles/dashboard.css";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <div>Not authenticated</div>;
  }

  const { id, address } = session.user;

  const firstVerified = await firstVerify(id, address);

  console.log("First verified", firstVerified);

  return (
    <div className="dashboard-layout">
      {/* portals preview */}
      <div className="dashboard-main flex items-center justify-center flex-col space-y-4 overflow-hidden">
        <div className="p-4 flex flex-col items-center gap-3 rounded-lg bg-gray-foreground">
          <p className="text-sm text-neutral-400">We are working here!</p>
          <div className="w-[300px] h-1 rounded overflow-hidden bg-brand-yellow/10">
            <div className="w-5/6 h-1 bg-brand-yellow" />
          </div>
        </div>
      </div>

      <div className="dashboard-sidebar rounded-xl border border-b-4 bg-neutral-950/50 border-white/10 border-b-white/5 p-4 space-y-4">
        {/* <div className="p-4 rounded-lg bg-brand-yellow/10">
          <h3 className="flex items-center gap-2 text-brand-yellow text-lg font-nicesugar mb-2">
            <Image
              src={cheesePointsIcon}
              width={20}
              height={20}
              alt="Cheese Point Icon"
            />
            $CHEESE points
          </h3>
          <p className="text-sm text-white">
            You can earn $CHEESE points by holding one or more NFTs of BlastToon
            PASS.
          </p>
        </div> */}

        <div className="p-4 rounded-lg bg-brand-green/10">
          <h3 className="flex items-center gap-2 text-brand-green text-lg font-nicesugar mb-2">
            <Image
              src={superCheeseIcon}
              width={20}
              height={20}
              alt="Cheese Point Icon"
            />
            Super $CHEESE
          </h3>
          <p className="text-sm text-white">
            You gain Super $CHEESE by upgrading your NFT in Blastr.xyz.
          </p>
        </div>

        <div className="p-4 rounded-lg bg-blue-700/20">
          <p className="text-sm text-white mb-3">
            Join our Discord to keep informed on updates.
          </p>
          <a
            href="https://discord.gg/BM4Y5c6G9R"
            target="_blank"
            className="flex items-center justify-center gap-2 font-bold p-2 rounded-lg bg-blue-700 text-white"
          >
            <BiLogoDiscordAlt size={22} />
            Join Discord
          </a>
        </div>
      </div>
    </div>
  );
}
