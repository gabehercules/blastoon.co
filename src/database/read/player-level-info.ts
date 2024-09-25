"use server";

import { error } from "console";
import prisma from "../prisma";
import { revalidatePath } from "next/cache";

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
