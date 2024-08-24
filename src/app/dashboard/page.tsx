import "@/styles/dashboard.css";

import cheesePointsIcon from "/public/cheese-coin.png";
import superCheeseIcon from "/public/super-cheese.png";
import cardPackIcon from "/public/card-icon.png";
import Image from "next/image";

import UserAvatar from "@/components/elements/user/user-avatar";
import { getNFTsByUserId } from "@/utils/get-nfts-by-address";
import UserNFTsList from "@/components/interface/user-nfts-section";
import { getUserCheese } from "@/database/read/get-user-cheese";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { firstVerify } from "@/utils/first-verify";
import { getUserCardPacks } from "@/utils/cardPacks";
import { getUserSuperCheese } from "@/utils/superCheese";
import { BiLogoDiscordAlt } from "react-icons/bi";
import VerifyOwnshipButton from "@/components/elements/verify-ownship";
import VerifyUpgradeButton from "@/components/elements/verify-upgrade-btn";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const maintenance = true;

  if (maintenance) {
    return redirect("/");
  }

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

  const superCheese = await getUserSuperCheese(id);

  const userCardPacks = await getUserCardPacks(id);

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
          <div className="flex-1 flex gap-4 p-5 rounded-xl bg-neutral-950/50 border border-b-4 border-white/10 border-b-white/5">
            {/* --- */}
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h1 className="text-white text-2xl font-nicesugar font-bold mb-3">
                  {session.user.address.slice(0, 4) +
                    "..." +
                    session.user.address.slice(-4)}
                </h1>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-4">
                  <Image
                    src={cheesePointsIcon}
                    height={32}
                    width={32}
                    alt="$CHEESE Points Icon"
                  />
                  <span className="text-xl font-nicesugar font-bold underline decoration-dotted underline-offset-4">
                    {cheese.toLocaleString("en")}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <Image
                    src={superCheeseIcon}
                    height={32}
                    width={32}
                    alt="Super $CHEESE Icon"
                  />
                  <span className="text-xl font-nicesugar font-bold underline decoration-dotted underline-offset-4">
                    {superCheese.toLocaleString("en")}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <Image
                    src={cardPackIcon}
                    height={32}
                    width={32}
                    alt="Card Pack Icon"
                  />
                  <span className="text-xl font-nicesugar font-bold underline decoration-dotted underline-offset-4">
                    {userCardPacks}
                  </span>
                </div>

                <VerifyUpgradeButton address={address} id={id} />
              </div>
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
          <div className="flex-1 flex flex-col rounded-lg border border-b-4 bg-neutral-950/50 border-white/10 border-b-white/5 overflow-hidden">
            <div className="flex items-center justify-between gap-4 py-2 px-4 border-b border-white/10">
              <h1 className="font-nicesugar text-lg font-bold">
                My Blast Toons
              </h1>
              <VerifyOwnshipButton id={id} address={address} />
            </div>
            <div className="overflow-y-auto p-6">
              <UserNFTsList nfts={nfts} />
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center rounded-lg bg-neutral-950/50 p-6 border border-b-4 border-white/10 border-b-white/5 ">
            {/* put an nice image here */}
            <h3 className="text-xl font-bold mb-3 font-nicesugar">
              You don{"'"}t own a Blast Toon
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
              <VerifyOwnshipButton id={id} address={address} />
            </div>
          </div>
        )}
      </div>

      <div className="dashboard-sidebar rounded-xl border border-b-4 bg-neutral-950/50 border-white/10 border-b-white/5 p-4 space-y-4">
        <div className="p-4 rounded-lg bg-brand-yellow/10">
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
        </div>

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
