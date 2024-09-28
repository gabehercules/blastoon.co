"use server";

import { error } from "console";
import prisma from "../prisma";

export async function getPlayerLevelInfo(addressId: string) {
  const lvlInfo = await prisma.player.findUnique({
    where: {
      addressId: addressId,
    },
    select: {
      level: true,
      xp: true,
    },
  });

  if (!lvlInfo) {
    return error("Player not found");
  }

  return lvlInfo;
}
