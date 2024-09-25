"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { getPlayerLevelInfo } from "@/database/read/player-level-info";
import { CustomUser } from "./cheese-balance";

export default function PlayerLevelAndXp() {
  const { data: session } = useSession();

  const user = session?.user as CustomUser;

  const {
    data: playerInfo,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["player-level-info"],
    queryFn: async () => getPlayerLevelInfo(user.id),
  });

  if (error) {
    return <div>Error...</div>;
  }

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 px-4">
        <div className="w-[40px] h-[16px] bg-white/10 rounded animate-pulse" />
        <div className="w-[180px] h-[16px] bg-white/10 rounded animate-pulse" />
      </div>
    );
  }

  console.log("PLAYER INFO", playerInfo);

  return (
    <div className="flex items-center gap-2 px-4">
      {/* lvl info */}
      <div className="bg-gradient-to-tr from-brand-yellow/40 to-brand-yellow/20 to-30% rounded p-1 border border-brand-yellow/10 border-b-2 border-b-brand-yellow/30 overflow-hidden">
        <p className="text-sm">
          Lvl{" "}
          <span className="text-brand-yellow font-semibold">
            {playerInfo?.level}
          </span>
        </p>
      </div>
      {/* xp bar */}
      <div className="space-y-1">
        <p className="text-xs text-neutral-400">
          <span className="text-brand-yellow">{playerInfo?.xp} xp</span>. 0 for
          the next level
        </p>
        <div className="relative w-[180px] h-1 flex items-center gap-1 bg-white/10 rounded overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-yellow-100 to-brand-yellow rounded-full"
            style={{ width: "50%" }}
          />
          {/* the width in a style tag above, should be useful for dinamic values...*/}
        </div>
      </div>
    </div>
  );
}
